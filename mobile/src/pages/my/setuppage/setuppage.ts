import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategorySearch, StaticCache, CategoryEnum } from 'oneheart-core';
import { FieldCategories } from '../categroy/fieldcategories';
import { DicTagsListPage } from '../tags/dictagslist';
import { UserTagsListPage } from '../tags/usertagslist';
@Component({
    selector: 'setuppage',
    templateUrl: 'setuppage.html'
})

export class MySetupPage {

    constructor(public navCtrl: NavController) { }
    openCategories(type: number) {
        var search: CategorySearch;
        switch (type) {
            case 4:
                search = { action: type, bindId: StaticCache.Config.UserId, bindtype: CategoryEnum.PersonCategories, useExt: true };
                break;
            case 20:
                search = { action: type, bindId: StaticCache.Config.UserId, bindtype: CategoryEnum.PersonCategories, useExt: true };
                break;
            case 21:
                search = { action: type, bindId: StaticCache.Config.UserId, bindtype: CategoryEnum.PersonCategories, useExt: true };
                break;
            default:
            case 0:
                search = { action: type, bindId: -1, bindtype: -1, useExt: true };
                break;
        }
        this.navCtrl.push(FieldCategories, search);
    }
    DicList() {
        this.navCtrl.push(DicTagsListPage);
    }
    UserList() {
        this.navCtrl.push(UserTagsListPage);
    }
}