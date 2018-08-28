import { Component, Input } from '@angular/core';
import { PostListModel, PostListModelHelper } from 'oneheart-core';

import { EventPostsViewBase } from './eventpostsviewbase';

@Component({
  selector: 'eventpostschatview',
  templateUrl: 'eventpostschatview.component.html',
})

export class EventpostsChatviewComponent extends EventPostsViewBase {  
  @Input()
  set items(value: Array<PostListModel>) {
    this._items = value;
    this.PostItems = PostListModelHelper.PostListModelItemsByType(this._items, this.segment);
  }
  get items(): Array<PostListModel> {
    return this._items;
  }
}
