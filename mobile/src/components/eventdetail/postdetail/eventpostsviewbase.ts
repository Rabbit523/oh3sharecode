import * as coreHeart from 'oneheart-core';

export class EventPostsViewBase {
  constructor() { }  
  _items: coreHeart.PostListModel[];
  segment = 'excludeupdate';
  PostItems = new Array<coreHeart.PostItemShow>();  
  updatePost() {
    this.PostItems = coreHeart.PostListModelHelper.PostListModelItemsByType(this._items, this.segment);
  }  
}
