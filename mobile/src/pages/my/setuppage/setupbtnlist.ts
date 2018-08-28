import { Component, Output,EventEmitter } from '@angular/core';
@Component({
    selector: 'setupbtnlist',
    templateUrl: 'setupbtnlist.html'
})
export class SetupBtnList {
    @Output() btnclick = new EventEmitter;

    openCategories(type: number) {
        this.btnclick.emit(type);
    }
}