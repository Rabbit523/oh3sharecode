import * as coreHeart from 'oneheart-core';
import { Events } from 'ionic-angular';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

export class EventListMenuBase {
    _DropDownValue: coreHeart.DropDownFilterUrlModel = new coreHeart.DropDownFilterUrlModel();
    get maxDate(): string { return coreHeart.Utils.NowDate(); }
    state: coreHeart.EventListMenuFilterContentState;//固定字段的筛选
    dicState: coreHeart.FieldsCategoryName[];//扩展字段的筛选


    constructor(public events: Events, public store$: Store<coreHeart.AppState>) {
        this.store$.select(s => s.EventListMenuFilterContent).subscribe(state => { this.state = state; });
        this.store$.dispatch(new coreHeart.EventListMenuFilterContentShowAction(coreHeart.initialEventListMenuFilterContentState));
    }

    filterChanges(filter: coreHeart.PageTitleAndFuntype) {
        if (filter) {
            this.store$.select(s => s.Dictionary.extdic).take(1).subscribe(extstate => {
                let search = new coreHeart.CategorySearch();
                search.action = filter.FunType;
                search.bindId = filter.bindId;
                search.bindtype = filter.bindtype;
                search.useExt = filter.useExt;
                let temp = coreHeart.FieldCategoriesBasePage.filter(extstate, "", search);
                temp.forEach(it => { this._DropDownValue.SCt[it.BindIdName] = ""; })
                this.dicState = temp;
            })
            let _sct = Object.assign({}, this._DropDownValue.SCt, filter.FilterDictionary.SCt)
            Object.assign(this._DropDownValue, filter.FilterDictionary);
            this._DropDownValue.SCt = _sct;
        }
    }

    doClick(id: number) {
        this.store$.dispatch(new coreHeart.EventListMenuFilterContentViewChangeAction(id));
        this.events.publish(coreHeart.EventConst.Event_ListViewChangeClick, id);
    }
}