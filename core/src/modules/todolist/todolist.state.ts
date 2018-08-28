
import { ListPager } from "../listpager";
import { BugQueryDto } from '../../shared/models/webapi/eventlist/eventlistjson';

export interface ToDoListState {
    pageTitle:string,
    pager: ListPager,
    Items: BugQueryDto[],
    count:number
}

export let initialToDoListState: ToDoListState = {
    pageTitle:"",
    pager: new ListPager(),
    Items: [],
    count:0
};
