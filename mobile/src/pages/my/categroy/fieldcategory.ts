import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { PageUtils } from '../../../shared/models/cache/pageutils';

@Component({
    selector: 'fieldcategory',
    templateUrl: 'fieldcategory.html'
})
export class FieldCategory {

    category: coreHeart.CategoryPageState = <coreHeart.CategoryPageState>{};
    categoryEmun: coreHeart.CategoryEmunState = <coreHeart.CategoryEmunState>{};//分类枚举

    constructor(public alert: AlertController, public navCtrl: NavController, public navPara: NavParams, public store$: Store<coreHeart.AppState>) {
    }

    ionViewDidLoad() {
        this.store$.select(s => s.Category).subscribe(data => {
            this.category = Object.assign({}, data);
            this._category = Object.assign({}, data.Category);
            this.CategoryDefault = this._category.Default == 1;
        });
        this.store$.select(s => s.CategoryEmun).take(1).subscribe(data => { this.categoryEmun = data; });
        this.store$.dispatch(new coreHeart.FecthCategoryAction(this.navPara.data.id));
    }

    okcancelChange(event: number) {
        if (event == 1) {
            if (this.validateModel()) {
                this.store$.dispatch(new coreHeart.UpdateCategoryAction(this._category));
                this.navCtrl.pop();
            }
            else {
                PageUtils.ShowPromt(this.alert);
            }
        } else {
            this.navCtrl.pop();
        }
    }

    _category: coreHeart.Category = new coreHeart.Category();//分类  
    CategoryDefault: boolean = false;
    //辅助提示
    bindTypeSelectOptions: any = { title: '分类类型', subTitle: '分类的使用者' };
    bindCategoryAction: any = { title: '分类属于', subTitle: '在哪个功能下使用' }
    defineFieldIdSelectOptions: any = { title: '分类字段', subTitle: '该分类应用于哪个字段' };

    bindTypeChange(data: any) {
        let pers = coreHeart.StaticCache.Config.PersonalizationJson;
        switch (data) {
            case 0://通用  0
                this._category.BindId = 0;
                break;
            case 1://人  1
                this._category.BindId = pers.ClaimData.UserId;
                break;
            case 2://部门  2
                this._category.BindId = pers.ClaimData.OrganizationId;
                break;
        }
    }
    validateModel(): boolean {
        this._category.Default = this.CategoryDefault ? 1 : 0;
        return this._category.Name.length > 0;
    }
}