import { Component, Input, OnChanges } from '@angular/core';
import { Events, ModalController, NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { TreeNode, EventDetailJson, AppState } from 'oneheart-core';
import { EventDetailJsonHelper, DepartPeopleHelper } from 'oneheart-core';
import { CategoryItemModal } from './categoryitemmodal';
import { FieldsReadWriteBase } from './fieldsreadwritebase';
import * as coreHeart from 'oneheart-core';

@Component({
  selector: 'eventtaskedititem',
  templateUrl: 'eventtaskedititem.component.html'
})

export class EventTaskEditItem extends FieldsReadWriteBase implements OnChanges {
  ngOnChanges(): void {
    if (this.itemEdit) {
      this.Initdata();
    }
  }
  @Input() itemEdit: EventDetailJson = new EventDetailJson();

  @Input() validate: boolean = true;
  showMain: boolean = false;

  constructor(public navCtrl: NavController, protected modalCtrl: ModalController, public store$: Store<AppState>, protected events: Events) {
    super(modalCtrl, store$);
  }

  SetDate(SelectedPlanDate: string) {
    this.itemEdit.Item.PlannedEndDate = SelectedPlanDate;
  }

  Initdata() {
    if (this.itemEdit.ActionType > -1) {
      let strs="";
      if (this.itemEdit.Item.customFields) {
        strs = EventDetailJsonHelper.GetAFieldbyCustomFieldNameID(this.itemEdit, coreHeart.DBFixed.KeepOnfile).cd_value;        
        this._InitCategoryfieldDropDown(strs, this.itemEdit.ActionType);
      }
      this.showMain = this.itemEdit.Item.id > 0 || strs.length > 0;
      this.DropDownTexts.AssignToName = DepartPeopleHelper.GetPeopleDisplayValueByids(this.itemEdit.Item.assignedto).join(",");
      let participants = EventDetailJsonHelper.GetAFieldbyCustomFieldNameID(this.itemEdit, coreHeart.DBTask.GetTaskUser(this.itemEdit.ActionType)).cd_value;
      this.DropDownTexts.BugParticipantsName = DepartPeopleHelper.GetPeopleDisplayValueByids(participants, this.itemEdit.Item.assignedto).join(",");
    }
  }
  ShowCategoriesModal() {
    this._ShowCategoriesModal(this.itemEdit, x => this.showMain = x);
  }

  ShowDepartModal() {
    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], false, false, "0").then((adata: any) => {
      if (adata) {
        let selectedArry = adata.data as TreeNode[];
        if (selectedArry.length > 0) {
          this.DropDownTexts.AssignToName = selectedArry[0].name;
          this.itemEdit.Item.assignedto = selectedArry[0].id.toString();
          this.SetAsToParticipant();
        }
      }
    });
  }
  ShowParticipant() {
    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], false, true, "0").then((adata: any) => {
      if (adata) {
        let selectedArry = adata.data as TreeNode[];
        if (selectedArry.length > 0) { this.GetParticipantTreeNodeNames(selectedArry); }
      }
    });
  }

  //分配人和参与人 全部写到参与人列表里
  private taskpersontemp: string = "";
  private GetParticipantTreeNodeNames(items: TreeNode[]) {
    var personname = "", newperson = "", added = true;;
    items.forEach((item) => {
      if (personname.length > 0) { personname += "、"; newperson += ","; }
      personname += item.name;
      if (this.itemEdit.Item.assignedto == item.id.toString())
        added = false;
      newperson += item.id;
    })
    this.taskpersontemp = newperson;
    if (added) {
      newperson += "," + this.itemEdit.Item.assignedto;
    }
    this.DropDownTexts.BugParticipantsName = personname;
    EventDetailJsonHelper.SetAFieldbyCustomFieldNameID(this.itemEdit, coreHeart.DBTask.GetTaskUser(this.itemEdit.ActionType), newperson);
  }
  private SetAsToParticipant() {
    var newperson = "";
    if (this.taskpersontemp != "") {
      newperson = this.taskpersontemp + "," + this.itemEdit.Item.assignedto;
    } else {
      newperson = this.itemEdit.Item.assignedto + "";
    }
    EventDetailJsonHelper.SetAFieldbyCustomFieldNameID(this.itemEdit, coreHeart.DBTask.GetTaskUser(this.itemEdit.ActionType), newperson);
  }
}