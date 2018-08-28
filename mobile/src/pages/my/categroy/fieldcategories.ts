import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { FieldCategory } from './fieldcategory';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

@Component({
    selector: 'fieldcategories',
    templateUrl: 'fieldcategories.html'
})
export class FieldCategories {
    categories: coreHeart.FieldsCategoryName[];
    search: coreHeart.CategorySearch = new coreHeart.CategorySearch();
    filter: string = "";
    constructor(protected events: Events, protected navparams: NavParams, public navCtrl: NavController, public store$: Store<coreHeart.AppState>
    ) {
        this.search = navparams.data as coreHeart.CategorySearch;        
        this.store$.select(s => s.Dictionary.extdic).subscribe(list => {
            this.categories = coreHeart.FieldCategoriesBasePage.filter(list, this.filter, this.search);
        });
    }
    EditCategory(idOrfid: number) {
        this.events.unsubscribe(coreHeart.EventConst.Event_CategoryAdded);
        this.events.subscribe(coreHeart.EventConst.Event_CategoryAdded, () => {
            this.store$.dispatch(new coreHeart.DictionaryGetExtDicAction(""));
        });
        this.navCtrl.push(FieldCategory, { id: idOrfid });
    }

    ItemsSearch(ev: any) {
        this.filter = ev.target.value
        this.store$.select(s => s.Dictionary.extdic).take(1) //takeLast
            .subscribe(list => {
                this.categories = coreHeart.FieldCategoriesBasePage.filter(list, this.filter, this.search);
            });
    }

}