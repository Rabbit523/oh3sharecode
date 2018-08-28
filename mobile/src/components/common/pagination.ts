import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as coreHeart from 'oneheart-core';

@Component({
  selector: 'pagination',
  templateUrl: 'pagination.html'
})

export class PaginationPage {
  @Input() pager = new coreHeart.ListPager();
  @Output() search = new EventEmitter<number>();//点击按钮出发的事件
  btnClick(pageNum: number) {
    this.search.emit(pageNum);
  }
}