
import { ListPager } from "../listpager";
import { MyNewPostCommentWithNamePic } from "../../shared/models/webapi/eventpost/postlistmodel";

export interface ReceivedListState {
    pager: ListPager,
    comments: MyNewPostCommentWithNamePic[]
}

export let initialReceivedListState: ReceivedListState = {
    pager: new ListPager(),
    comments: []
};
