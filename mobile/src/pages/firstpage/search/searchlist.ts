import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchState } from 'oneheart-core';

@Component({
    selector: 'searchlist',
    templateUrl: 'searchlist.html',
})
export class SearchList {
    _item: any = {};
    @Input()
    get items(): SearchState { return this._item; }
    set items(val: SearchState) { if (val && val.text) {this._item =Object.assign({}, val,{text:val.text.replace(new RegExp(this.tag,"g"),"")}); } }
    @Output() openEvent = new EventEmitter;
    btnClick(id: number) {
        this.openEvent.emit(id);
    }
    tag: string = "tags://";//"|desc://|pj_name://";    
}