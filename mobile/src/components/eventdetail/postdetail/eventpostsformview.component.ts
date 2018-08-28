import { Component, Input } from '@angular/core';
import { PostListModel } from 'oneheart-core';
import { PostListModelHelper } from 'oneheart-core';

import { EventPostsViewBase } from './eventpostsviewbase';

@Component({
  selector: 'eventpostsformview',
  templateUrl: 'eventpostsformview.component.html',
})

export class EventPostsFormview extends EventPostsViewBase {

  @Input()
  get items(): PostListModel[] {
    return this._items;
  }
  set items(item: PostListModel[]) {
    this._items = item;
    this.PostItems = PostListModelHelper.InitPostItems(this._items, this.segment);
  }
}