import { FieldsCategoryName } from 'oneheart-core';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'categorylistcomponent',
    templateUrl: "categorylist.component.html"
})
export class CategoryListComponent {
    @Input() cateList: FieldsCategoryName[];
    @Output() itemclick: EventEmitter<number> = new EventEmitter<number>();
    constructor() { }
    EditCategory(i: number, j: number, act: string) {
        var it = this.cateList[i].DefineFields[j];
        var data: number;
        if (act == "edit")
            data = it.Id;
        else
            data = -1 * it.DefineFieldId;
        this.itemclick.emit(data);
    }
}