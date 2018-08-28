export class ListPager {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  constructor() {
    this.pageIndex = 1;
    this.pageCount = 1;
    this.pageSize = 15;
  }
}