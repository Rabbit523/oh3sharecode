
import { ListPager } from "../listpager";
import { BugQueryDto } from '../../shared/models/webapi/eventlist/eventlistjson';

export interface ExtToDoListState {
    label: string;
    fid: number;
    pageTitle: string,
    pager: ListPager,
    Items: BugQueryDto[],
    count: number,
    st: string
}

export let initialExtToDoListState: ExtToDoListState = {
    label: "", fid: 0, pageTitle: "", pager: new ListPager(), Items: [], count: 0, st: ""
};
