import { JsonDictionary } from "../../shared/models/common";
import { TreeViewModel } from "../../shared/models/webapi";

export interface AjaxState {
    PostEvent: number, PostFile: string,
    ViewThumb: string, SelectFeildsFromTree: TreeViewModel,
    AllProjectTree: TreeViewModel, SelfAutoSubScribersTree: TreeViewModel,
    SelectAllFromTree: TreeViewModel, SelectAssignToFromTree: TreeViewModel,
    GetProjectPermissionBy: Array<string>, GetBugKeyWords: JsonDictionary<number>,
    GetMeetingExsit: string, EndMeeting: string,
    RebuildMeeting: string, GoToMeeting: string,
    GetPlayBlack: string, CloseMasterDetails: string, DeleteComment: string,
}

export let initialAjaxState: AjaxState = {
    PostEvent: 0, PostFile: "",
    ViewThumb: "", SelectFeildsFromTree: new TreeViewModel(),
    AllProjectTree: new TreeViewModel(), SelfAutoSubScribersTree: new TreeViewModel(),
    SelectAllFromTree: new TreeViewModel(), SelectAssignToFromTree: new TreeViewModel(),
    GetProjectPermissionBy: [], GetBugKeyWords: {},
    GetMeetingExsit: "", EndMeeting: "",
    RebuildMeeting: "", GoToMeeting: "",
    GetPlayBlack: "", CloseMasterDetails: "", DeleteComment: "",
};
