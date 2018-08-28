import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'tagslistcomponent',
    templateUrl: "tagslist.component.html"
})
export class TagsListComponent {

    @Input() Items=[];
    @Output() editTag = new EventEmitter();
    itemClick(id: number) {
        this.editTag.emit(id);
    }
}