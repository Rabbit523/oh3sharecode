import { Component, Input } from '@angular/core';
import { PostListModel, PostListModelHelper } from 'oneheart-core';

import { EventPostsViewBase } from './eventpostsviewbase';

@Component({
  selector: 'eventpostscontentview',
  templateUrl: 'eventpostscontentview.component.html',
})

export class EventPostsContentView extends EventPostsViewBase {
  @Input()
  set items(value: Array<PostListModel>) {
    this._items = value;
    this.PostItems = PostListModelHelper.PostListModelItemsByType(this._items, "*");
  }
  get items(): Array<PostListModel> {
    return this._items;
  }
}