import { Component, Input, OnChanges } from '@angular/core';
import { Events, Modal, ModalController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { CategoryItemModal } from './categoryitemmodal';

@Component({
  selector: 'eventeditproblem',
  templateUrl: 'eventeditproblem.component.html',
})

export class EventEditProblem implements OnChanges {
  constructor(protected modalCtrl: ModalController, protected events: Events) { }

  @Input() ItemDetail: coreHeart.EventDetailJson = new coreHeart.EventDetailJson();
  @Input() bugProblem: coreHeart.BugProblem = new coreHeart.BugProblem();  
  @Input() validate: boolean = true;

  ngOnChanges() {
    if (this.ItemDetail) {
      this.InitData();
    }
  }

  PlanDate: string;
  InitData() {
    this.PlanDate = coreHeart.DateConvertBaseHelper.getDateStrFromCsharp(this.ItemDetail.Item.PlannedEndDate);
  }
  SetDateEndDate() {
    this.bugProblem.fieldProblemEndDate.cd_value = coreHeart.DateConvertBaseHelper.getCsharpDateStr(this.PlanDate);
    
  }


  get ChangeTxt() {
    return this.bugProblem.fieldProblemChange.cd_value;
  }
  set ChangeTxt(val: string) {
    this.bugProblem.fieldProblemChange.cd_value = val;
    
  }
  treemodal: Modal;
  ShowResponsibleDepart() {
    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], true, false, "0").then(
      (adata: any) => {
        if (adata) {
          let selectedArry = adata.data as coreHeart.TreeNode[];
          if (selectedArry.length > 0) {
            this.bugProblem.fieldProblemResponsibleDepart.Item.cd_value = coreHeart.TreeNodeHelper.GetIdsWithSplit(selectedArry);
            this.bugProblem.fieldProblemResponsibleDepart.pageDisplay = coreHeart.TreeNodeHelper.GetNamesArray(selectedArry);
            
          }
        }
      }
    );
  }

  ShowResponsiblePerson() {
    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], false, false, this.bugProblem.fieldProblemResponsibleDepart.Item.cd_value).then((adata: any) => {
      if (adata) {
        let selectedArry = adata.data as coreHeart.TreeNode[];
        if (selectedArry.length > 0) {
          this.bugProblem.fieldProblemResponsiblePerson.Item.cd_value = coreHeart.TreeNodeHelper.GetIdsWithSplit(selectedArry);
          this.bugProblem.fieldProblemResponsiblePerson.pageDisplay = coreHeart.TreeNodeHelper.GetNamesArray(selectedArry);
          
        }
      }
    });

  }

  ShowCoordinateDepart() {
    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], true, false, "0").then(
      (adata: any) => {
        if (adata) {
          let selectedArry = adata.data as coreHeart.TreeNode[];
          if (selectedArry.length > 0) {
            this.bugProblem.fieldProblemCoordinateDepart.Item.cd_value = coreHeart.TreeNodeHelper.GetIdsWithSplit(selectedArry);
            this.bugProblem.fieldProblemCoordinateDepart.pageDisplay = coreHeart.TreeNodeHelper.GetNamesArray(selectedArry);
            
          }
        }
      });

  }
  ShowSuperviseDepart() {

    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], true, false, "0").then((adata: any) => {
      if (adata) {
        let selectedArry = adata.data as coreHeart.TreeNode[];
        if (selectedArry.length > 0) {
          this.bugProblem.fieldProblemSuperviseDepart.Item.cd_value = coreHeart.TreeNodeHelper.GetIdsWithSplit(selectedArry);
          this.bugProblem.fieldProblemSuperviseDepart.pageDisplay = coreHeart.TreeNodeHelper.GetNamesArray(selectedArry);
          
        }
      }
    });

  }
  ShowMajorPerson() {
    CategoryItemModal.ShowDepartEmployee(this.modalCtrl, [], false, false, this.bugProblem.fieldProblemSuperviseDepart.Item.cd_value).then((adata: any) => {
      if (adata) {
        let selectedArry = adata.data as coreHeart.TreeNode[];
        if (selectedArry.length > 0) {
          this.bugProblem.fieldProblemMajorPerson.Item.cd_value = coreHeart.TreeNodeHelper.GetIdsWithSplit(selectedArry);
          this.bugProblem.fieldProblemMajorPerson.pageDisplay = coreHeart.TreeNodeHelper.GetNamesArray(selectedArry);
          
        }
      }
    });

  }
}