import { Component, Input, OnChanges } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CategoryItemModal } from './categoryitemmodal';
import { FieldsReadWriteBase } from './fieldsreadwritebase';
import { Store } from '@ngrx/store';
import { TreeNode, DepartPeopleHelper } from 'oneheart-core';
import { EventDetailJson } from 'oneheart-core';
import { DateConvertBaseHelper, AppState } from 'oneheart-core';
import { EventDetailJsonHelper, DBFixed } from 'oneheart-core';


@Component({
  selector: 'eventedititem',
  templateUrl: 'eventedititem.component.html',
})

export class EventEditItem extends FieldsReadWriteBase implements OnChanges {
  ngOnChanges(): void {
    if (this.itemEdit) {
      this.Initdata();
    }
  }
  @Input() itemEdit: EventDetailJson = new EventDetailJson();

  PlanDate: string;

  constructor(protected modalCtrl: ModalController, public store$: Store<AppState>) {
    super(modalCtrl, store$);
  }
  Initdata() {
    if (this.itemEdit.Item.customFields) {
      var strs = EventDetailJsonHelper.GetAFieldbyCustomFieldNameID(this.itemEdit, DBFixed.KeepOnfile).cd_value;
      this._InitCategoryfieldDropDown(strs, this.itemEdit.ActionType);
    }
    this.DropDownTexts.AssignToName = DepartPeopleHelper.GetPeopleDisplayValueByids(this.itemEdit.Item.assignedto+"", "0").join(",");
    this.PlanDate = DateConvertBaseHelper.getDateStrFromCsharp(this.itemEdit.Item.PlannedEndDate);
  }
  SetDate() {
    this.itemEdit.Item.PlannedEndDate = DateConvertBaseHelper.getCsharpDateStr(this.PlanDate);
  }

  ShowDepartModal() {
    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], false, false, "0").then((adata: any) => {
      if (adata) {
        let selectedArry = adata.data as TreeNode[];
        if (selectedArry.length > 0) {
          this.DropDownTexts.AssignToName = selectedArry[0].name;
          this.itemEdit.Item.assignedto = selectedArry[0].id.toString();
        }
      }
    });
  }
}