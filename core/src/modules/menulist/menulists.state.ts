import { ApplicationPageListGroup } from "../../shared/models/common/pagemodel";
export interface MenuListsState {
    Page_first: Array<ApplicationPageListGroup>;
    Page_App: Array<ApplicationPageListGroup>;
}
export let initialMenuListState: MenuListsState = {
    Page_first: [], Page_App: []
}