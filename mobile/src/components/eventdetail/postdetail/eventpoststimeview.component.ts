import { PostListModel, PostListModelHelper } from 'oneheart-core';
import {EventPostsViewBase} from './eventpostsviewbase';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'eventpoststimeview',
  templateUrl: 'eventpoststimeview.component.html',
})

export class EventpostsTimeviewComponent extends EventPostsViewBase{
  @Input() 
  get items(): PostListModel[]{return this._items;}
  set items(val: PostListModel[]){
    this._items=val;
    this.PostItems = PostListModelHelper.PostListModelItemsByType(this._items, "*");
  }  
}
