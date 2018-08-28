import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as coreHeart from 'oneheart-core';
import { Events } from 'ionic-angular';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import { EventListMenuBase } from './eventlistmenubase';
@Component({
    selector: "eventlistmenufiltercontent",
    templateUrl: "eventlistmenufiltercontent.html"
})
export class EventListMenuFilterContent extends EventListMenuBase implements OnChanges {

    @Input() filter: coreHeart.PageTitleAndFuntype;
    @Output() setDropDownValue = new EventEmitter<coreHeart.DropDownFilterUrlModel>();
    @Input() showview: boolean;

    constructor(public events: Events, public store$: Store<coreHeart.AppState>) {
        super(events, store$);
    }

    ngOnChanges() {
        this.filterChanges(this.filter);
        this._initFilterDic(0);
    }

    viewclick(id: number) {
        this.doClick(id);
        this.setDropDownValue.emit(null);//close menu
    }

    MenuFilter(act: number) {
        this.setDropDownValue.emit(act == 1 ? this._DropDownValue : null);
    }
    SelectItem(i: number, id: number, setval: string) {
        this._filterClick(i, id);
        this._DropDownValue.SCt[setval] = id + "";
    }
    SelectBackItem(i: number, id: number) {
        this._filterClick(i, id);
    }


    dicShow: boolean[];
    selectedcat: coreHeart.CategoryNameDto[][];
    treebread: coreHeart.CategoryNameDto[][];
    selectdisplay: string[];
    SHowHide(index: number) {
        this.dicShow[index] = !this.dicShow[index];
    }
    _initFilterDic(id: number) {
        let temp = [];
        this.treebread = []; this.dicShow = []; this.selectdisplay = [];
        this.dicState.forEach((x, i) => {
            temp[i] = [];
            this.treebread.push([]); this.dicShow.push(false); this.selectdisplay.push("无");
            this._recalcTreeBread(i, id);
            x.DefineFields.forEach((y, j) => {
                if (y.ParentId == id)
                    temp[i].push(Object.assign({}, y));
            })
        })
        this.selectedcat = temp;
    }

    _filterClick(index: number, id: number) {
        let temp = [];
        this.dicState[index].DefineFields.forEach((y, j) => {
            if (y.ParentId == id || (id == -1 && y.ParentId == 0))
                temp.push(Object.assign({}, y));
        })
        this._recalcTreeBread(index, id);
        this.selectedcat[index] = temp;
    }

    _recalcTreeBread(index: number, id: number) {
        var temp = [], select = this.selectdisplay;
        let parentid = id;
        while (parentid > 0) {
            this.dicState[index].DefineFields.forEach(element => {
                if (element.Id == parentid) {
                    if (parentid == id)
                        select[index] = element.Name;
                    temp.unshift(element);
                    parentid = element.ParentId;
                }
            });
        }
        temp.unshift({ Id: -1, Name: "全部" })
        this.treebread[index] = temp;
        this.selectdisplay = select;
    }
}