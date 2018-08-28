
import { ModalController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { CategoryItemModal } from './categoryitemmodal';
import { Store } from '@ngrx/store';

export class FieldsReadWriteBase {
    constructor(protected modalCtrl: ModalController, public store$: Store<coreHeart.AppState>) { }

    CategoryfieldDropDown: Array<coreHeart.CategoryNameDto>=[];
    DropDownTexts: coreHeart.DetailDropDownValues = new coreHeart.DetailDropDownValues();

    _InitCategoryfieldDropDown(strs: string, actype: number) {
        this.store$.select(s => s.Dictionary.extdic).subscribe(data => {
            let tempSearch = coreHeart.FieldCategoriesBasePage.filter(data, "", { action: actype, bindId: coreHeart.StaticCache.Config.UserId, bindtype: coreHeart.CategoryEnum.PersonCategories, useExt: true });            
            tempSearch.forEach(aitem => {
                if (aitem.BindIdName == coreHeart.DBFixed.KeepOnfile) {
                    let temp = [];
                    aitem.DefineFields.forEach(it => {
                        temp.push(it);
                        if (it.Id.toString() == strs) this.DropDownTexts.CategoryName = it.Name;
                    })
                    this.CategoryfieldDropDown = temp;
                }
            })
        })
    }
    _ShowCategoriesModal(_itemDetail: coreHeart.EventDetailJson, callb?: (v: boolean) => void) {        
        CategoryItemModal.ShowCategoriesModal(this.modalCtrl, false, false, this.CategoryfieldDropDown).then((adata: any) => {
            if (adata) {
                let selectedArry = adata.data as coreHeart.TreeNode[];
                if (selectedArry.length > 0 && Number(selectedArry[0].id) > 0) {
                    this.DropDownTexts.CategoryName = selectedArry[0].name;
                    coreHeart.EventDetailJsonHelper.SetAFieldbyCustomFieldNameID(_itemDetail, coreHeart.DBFixed.KeepOnfile, selectedArry[0].id.toString());
                    if (callb) callb(selectedArry[0].id > 0);
                }
            }
        });
    }

}