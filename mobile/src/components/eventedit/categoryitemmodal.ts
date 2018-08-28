import { ModalController } from 'ionic-angular';
import { StaticCache } from 'oneheart-core';
import { CategoryNameDto } from 'oneheart-core';
import { TreeNode } from 'oneheart-core';
import { TreeSelectorHelper } from '../tree/treeselectorhelper';

export class CategoryItemModal {

  static ShowCategoriesModal(modalCtrl: ModalController, rootSelected: boolean, multi: boolean, dataList: CategoryNameDto[]): Promise<any> {
    let CategroiesList: TreeNode[] = new Array<TreeNode>();
    let ItemsList: TreeNode[] = new Array<TreeNode>();
    let temp: TreeNode[] = new Array<TreeNode>();
    dataList.forEach(tn => { temp.push(new TreeNode(tn.Id, tn.Name, tn.ParentId)) });
    if (!rootSelected) {
      this.GetTree(temp, "0", CategroiesList, ItemsList);
    }
    else {
      ItemsList = temp;
      CategroiesList = temp;
    }
    return new Promise((resolve, reject) => {
      let DepartModal = TreeSelectorHelper.CreateModalTree(modalCtrl, "0", [], CategroiesList, ItemsList, multi, ["分类", "子项"], "分类列表");
      DepartModal.onDidDismiss((adata: any) => { resolve(adata) });
      DepartModal.present();
    })
  }
  static ShowDepartEmployee(modalCtrl: ModalController, select: Array<number>, DepartOrUser: boolean, multi: boolean, nodeRoot: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let DepartModal, str = "部门人员列表";
      if (DepartOrUser) {
        DepartModal = TreeSelectorHelper.CreateModalCheck(modalCtrl, nodeRoot, select, StaticCache.departmentEmployeeDepartmentNodes, multi, ["", "部门"], str);
      } else {
        DepartModal = TreeSelectorHelper.CreateModalTree(modalCtrl, nodeRoot, select, StaticCache.departmentEmployeeDepartmentNodes, StaticCache.departmentEmployeeEmployeeNodes, multi, ["部门", "用户"], str);
      }
      DepartModal.onDidDismiss((adata: any) => { resolve(adata) });
      DepartModal.present();
    })
  }

  private static GetTree(AllList: TreeNode[], id: string, CateList: TreeNode[], ItemList: TreeNode[]) {
    let cateids = new Array<number>();
    let catepids = new Array<number>();
    for (let i = 0; i < AllList.length; i++) {
      catepids.push(AllList[i].parentid);
      cateids.push(AllList[i].id);
    }
    var temp = cateids.filter(x => catepids.indexOf(x) == -1)
    for (let i = 0; i < AllList.length; i++) {
      if (temp.indexOf(AllList[i].id) != -1 && AllList[i].parentid != 0)
        ItemList.push(AllList[i]);
      else
        CateList.push(AllList[i]);
    }
  }
}