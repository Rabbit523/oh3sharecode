import { Input, Output, EventEmitter } from "@angular/core";
import { ApplicationPageListGroup } from "oneheart-core";

export class MenuClick {
    @Input() items: ApplicationPageListGroup[] = [];
    @Output() openModel = new EventEmitter;
    itemOpenModel(index: string) {
        this.openModel.emit(index);
    }
}