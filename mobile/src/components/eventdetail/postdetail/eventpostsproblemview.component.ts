import { PostListModel, PostListModelHelper } from 'oneheart-core';
import {EventPostsViewBase} from './eventpostsviewbase';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'eventpostsproblemview',
  templateUrl: 'eventpostsproblemview.component.html',
})

export class EventpostsProblemviewComponent extends EventPostsViewBase{
  @Input() 
  get items(): PostListModel[]{return this._items;}
  set items(val: PostListModel[]){
    this._items=val;
    this.PostItems = PostListModelHelper.PostListModelItemsByType(this._items, "excludeupdate");
  }  
}
