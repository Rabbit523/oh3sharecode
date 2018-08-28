import { StaticCache } from "../staticcache";
import { GUID } from "../models/webapi/roles/role";
import { state } from '@angular/core';
export class WebapiConfig {
    //基础
    static geturl(relativeurl: string): string { return StaticCache.Config.baseurl + relativeurl; }
    static geturlpic(relativeurl: string): string { return StaticCache.Config.baseurl + relativeurl + "?v=" + Date.now(); }
    static geturlAppv(relativeurl: string, v: string): string { if (relativeurl.indexOf("?") > -1) { relativeurl += "&" } else { relativeurl += "?" } relativeurl += "app-version=" + v; return StaticCache.Config.baseurl + relativeurl; }

    // 验证和热更部分
    static getrevocationurl(): string { return WebapiConfig.geturl("/idsrv/connect/revocation"); }
    static gettokenvalidataurl(): string { return WebapiConfig.geturl("/idsrv/connect/accesstokenvalidation"); }
    static getloginurl(): string { return WebapiConfig.geturl("/idsrv/connect/token"); }
    static appCodeVersion() { return StaticCache.Config.interfacecode + " " + StaticCache.Config.appVersion.substring(0, 20); }
    static configFile() { return 'http://ohapp.railsky.com/' + StaticCache.Config.interfacecode + '/chcp.json' }
    static options() { return { 'config-file': WebapiConfig.configFile }; }
    // 视频播放部分 api/Media
    static getStaticPagedListurl(pIndex: number, pSize: number, sCam: number, cStDate: string, cEndDate: string): string { return WebapiConfig.geturl("api/media/GetStaticPagedList?pIndex=" + pIndex + "&pSize=" + pSize + "&sCam=" + sCam + "&cStDate=" + cStDate + "&cEndDate=" + cEndDate); }
    static getMediaShowPlayListurl(placeid: number, isActive: boolean, day: string): string { return WebapiConfig.geturl("api/media/GetShowPlayList?placeid=" + placeid + "&isActive=" + isActive + "&day=" + day); }
    static getMediaProtectsurl(camId: number): string { return WebapiConfig.geturl("api/media/GetProtects?camId=" + camId); }
    static getMediaListurl(active: boolean): string { return WebapiConfig.geturl("api/media/GetList?isActive=" + active); }
    // api 数据部分 api/usertags
    static getusertagsGetByurl(id: number): string { return WebapiConfig.geturl("api/usertags/GetBy?id=" + id); }
    static getusertagsGetUserTagsurl(): string { return WebapiConfig.geturl("api/usertags/GetUserTags"); }
    static getusertagsGetDicTagsurl(): string { return WebapiConfig.geturl("api/usertags/GetDicTags"); }
    static getusertagsInserturl(name: string, parentid: number, ids: string): string { return WebapiConfig.geturl("api/usertags/Insert?n=" + name + "&p=" + parentid + "&ids=" + ids); }
    static getusertagsUpdateurl(id: number, name: string, parentid: number, ids: string): string { return WebapiConfig.geturl("api/usertags/Update?i=" + id + "&n=" + name + "&p=" + parentid + "&ids=" + ids); }
    static getusertagsDeleteurl(id: number): string { return WebapiConfig.geturl("api/usertags/Delete?id=" + id); }
    // api 数据部分 api/bugtags
    static getbugtagsGetByurl(id: number): string { return WebapiConfig.geturl("api/bugtags/GetBy?id=" + id); }
    static getbugtagsGeturl(): string { return WebapiConfig.geturl("api/bugtags/Get"); }
    static getbugtagsnInserturl(name: string): string { return WebapiConfig.geturl("api/bugtags/Insert?name=" + name); }
    static getbugtagsnupdateurl(id: number, name: string): string { return WebapiConfig.geturl("api/bugtags/update?id=" + id + "&name=" + name); }
    // api 数据部分 api/logs
    static getlogspostdataurl(): string { return WebapiConfig.geturl("api/logs/PostData"); }
    // api 数据部分 api/test
    static gettestvurl(): string { return WebapiConfig.geturl("api/test/get"); }
    // api 数据部分 api/Contacts
    static getcontactorurl(active: boolean): string { return WebapiConfig.geturl("api/Contacts/get?yn=" + (active ? 1 : 0)); }
    static getpostuserpicurl(userLoginName: string): string { return WebapiConfig.geturl("api/Contacts/PostFile?usName=" + userLoginName); }
    static getemployeetreeurl(): string { return WebapiConfig.geturl("api/Contacts/GetEmployeeTree"); }
    static getUserGetUrl(id: number): string { return WebapiConfig.geturl("api/Contacts/GetUser?usid=" + id); }
    static getUseSetUrl(): string { return WebapiConfig.geturl("api/Contacts/SetUser"); }
    static getUserListUrl(): string { return WebapiConfig.geturl("api/Contacts/GetBy"); }
    static getImportUserUrl(): string { return WebapiConfig.geturl("api/Contacts/ImportUser"); }
    static getPostPermissionUrl(usid: number, pjIds: string, pType: number): string { return WebapiConfig.geturl("api/Contacts/PostPermission?usid=" + usid + "&pjIds=" + pjIds + "&pType=" + pType); }
    // api 数据部分 api/map
    static getApiMapurl(latitude: number, longtitude: number): string { return WebapiConfig.geturl("api/map/GET?latitude=" + latitude + "&longtitude=" + longtitude); }
    // api 数据部分 api/Personalization
    static getuserdataurl(): string { return WebapiConfig.geturl("api/Personalization/Get"); };
    static getchecktokenurl(plat: number): string { return WebapiConfig.geturl("api/Personalization/check?pl=" + plat); };
    // api 数据部分 api/BugUsers
    static getmytractorurl(): string { return WebapiConfig.geturl("api/BugUsers/GetSeen"); }
    static getmybookmarkurl(): string { return WebapiConfig.geturl("api/BugUsers/GetNote"); }
    static SetBugNote(id: number): string { return WebapiConfig.geturl("api/BugUsers/SetBugNote?id=" + id); }
    static GetBugUserDtoS(id: number, usid: number): string { return WebapiConfig.geturl("api/BugUsers/GetBugUserDtoS?id=" + id + "&usid=" + usid); }
    // api 数据部分 api/event
    static getEventlistUrl(): string { return WebapiConfig.geturl("api/event/Get"); }
    static getEventCountUrl(): string { return WebapiConfig.geturl("api/event/GetCount"); }
    static getTODOListurl(index: number, size: number): string { return WebapiConfig.geturl("api/event/todo?" + "pindex=" + index + "&psize=" + size); }
    static getEXTTODOListurl(index: number, size: number, label: string, fid: number, st: string): string { return WebapiConfig.geturl("api/event/exttodo?" + "pindex=" + index + "&psize=" + size + "&label=" + label + "&fid=" + fid + "&st=" + st); }
    static geteventgetnewpostsurlurl(pageIndex: number, pageSize: number): string { return WebapiConfig.geturl("api/event/GetNewPosts?pageIndex=" + pageIndex + "&pageSize=" + pageSize); }
    static geteventpostrurl(id: number): string { return WebapiConfig.geturl("api/event/GetPost?bgid=" + id); }
    static geteventdetailrurl(id: number): string { return WebapiConfig.geturl("api/event/GetEvent?id=" + id); }
    static getdropdownchangerurl(pid: number, oid: number, bid: number, aid: number): string { return WebapiConfig.geturl("api/event/GetDropDown?pjid=" + pid + "&ogid=" + oid + "&bgid=" + bid + "&prevag=" + aid); }
    static getsetcheckedurl(id: number, st: boolean): string { return WebapiConfig.geturl("api/event/GetChecked?id=" + id + "&st=" + st); };
    static getcategorykvdefineurl(act: number): string { return WebapiConfig.geturl("api/event/CategoryKVDefine?act=" + act); };
    static SetExtendSubTable(bgId: number, fid: number, dataStr: string): string { return WebapiConfig.geturl("api/event/SetExtendSubTable?bgId=" + bgId + "&fid=" + fid + "&dataStr=" + dataStr); };
    static getsetstatusurl(bgid: number, stid: string): string { return WebapiConfig.geturl("api/event/SetStatus?bgid=" + bgid + "&bgst=" + stid); };
    static getUpdataACoustomDetailurl(CustomId: number, CustomStr: string): string { return WebapiConfig.geturl("api/event/CoustomStatus?cid=" + CustomId + "&va=" + CustomStr); }
    static geteditposturl(): string { return WebapiConfig.geturl("api/event/Post"); }
    static getdeletebugurl(id: number, delornot: boolean): string { return WebapiConfig.geturl("api/event/DeleteBug?id=" + id + "&del=" + delornot); }
    static getpostcommenturl(): string { return WebapiConfig.geturl("api/event/PostCommentFile"); }
    static geteditpostfileurl(bgid: number): string { return WebapiConfig.geturl("api/event/PostFile?bgId=" + bgid); }
    static GetBugTasksurl(bId: number, act: number = -1): string { return WebapiConfig.geturl("api/event/GetBugTasks?bId=" + bId + "&act=" + act); };
    static Getbugtaskurl(bId: number, tId: number, fId: number): string { return WebapiConfig.geturl("api/event/GetBugTask?bId=" + bId + "&tId=" + tId + "&fId=" + fId); };
    static getdeletebugtaskfileurl(tId: number): string { return WebapiConfig.geturl("api/event/DeleteBugTask?tId=" + tId); };
    static gettaskcomplateurl(tId: number): string { return WebapiConfig.geturl("api/event/TaskComplate?tid=" + tId); };
    static getsavebugtaskurl(fieldId: string): string { return WebapiConfig.geturl("api/event/SaveBugTask?fid=" + fieldId); };
    // api 数据部分 api/WorkFlow
    static getcommandstateurl(bgid: number, actid: number): string { return WebapiConfig.geturl("api/WorkFlow/GetCommandState?bgid=" + bgid + "&actid=" + actid); }
    static getexecuteandupdateurl(bgid: number, key: string, updateUser: boolean): string { return WebapiConfig.geturl("api/WorkFlow/ExecuteAndUpdate?bgid=" + bgid + "&command=" + key + "&canUpdate=" + updateUser); }
    // api 数据部分 api/Category
    static getApiCategoriesurl(act: number, bindType: number, bindid: number, ext: boolean): string { return WebapiConfig.geturl("api/Category/GetCategories?act=" + act + "&type=" + bindType + "&bindid=" + bindid + "&etf=" + ext); }
    static getApiCategoryurl(id: number): string { return WebapiConfig.geturl("api/Category/GetCategory?id=" + id); }
    static getApiCategoryInsertUpdateurl(): string { return WebapiConfig.geturl("api/Category/InsertUpdate"); }
    static getApiCategoryDeleteurl(id: number): string { return WebapiConfig.geturl("api/Category/Delete?id=" + id); }
    // api 数据部分 api/Chart
    static getchartlisturl(type1: string, type2: string) { return WebapiConfig.geturl("api/Chart/Get?t1=" + type1 + "&t2=" + type2); };
    static getBCDataJsonStrUrl() { return WebapiConfig.geturl("api/Chart/GetBCData"); };
    static getChartCalcSelectorUrl(): string { return WebapiConfig.geturl("api/SelectItem/chartSelector"); }
    // api 数据部分 api/SelectItem
    static getcategoryenumurl(): string { return WebapiConfig.geturl("api/SelectItem/GetCategoryEmun"); }
    static getAllFieldsUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetAllFields"); }
    static getFunctionTypesUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetFunctionTypes"); }
    static getProjectsUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetProjects"); }
    static getFlagsUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetFlags"); }
    static getStatussUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetStatuss"); }
    static getPrioritysUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetPrioritys"); }
    static getCategorysUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetCategorys"); }
    static getUsersUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetUsers"); }
    static getOrganizationsUrl(): string { return WebapiConfig.geturl("api/SelectItem/GetOrganizations"); }
    // api 数据部分 api/search
    static getSearchUrl(page: number, pagesize: number, searchText: string): string { return WebapiConfig.geturl("api/search/get?Page=" + page + "&PageSize=" + pagesize + "&searchText=" + searchText); }
    //api  数据部分 api/orgs    
    static getOrgDelUrl(id: number): string { return WebapiConfig.geturl("api/orgs/del?id=" + id); }
    static getOrgGetUrl(id: number): string { return WebapiConfig.geturl("api/orgs/Get?id=" + id); }
    static getOrgSetUrl(): string { return WebapiConfig.geturl("api/orgs/Post"); }
    static getOrgListUrl(psize: number, pindex: number): string { return WebapiConfig.geturl("api/orgs/GetList?pSize=" + psize + "&pIndex=" + pindex); }
    //api  数据部分 api/project
    static getBarCordNameUrl(): string { return WebapiConfig.geturl("api/project/BarCordName"); }
    static getProjectDelUrl(id: number): string { return WebapiConfig.geturl("api/project/del?id=" + id); }
    static getProjectGetUrl(id: number): string { return WebapiConfig.geturl("api/project/Get?id=" + id); }
    static getProjectSetUrl(): string { return WebapiConfig.geturl("api/project/Post"); }
    static getProjectListUrl(functype: number, psize: number, pindex: number): string { return WebapiConfig.geturl("api/project/GetList?funcId=" + functype + "&pSize=" + psize + "&pIndex=" + pindex); }
    static getPermissionListUrl(pjid: number, usid: number, pType: number, psize: number, pindex: number): string { return WebapiConfig.geturl("api/project/GetPermissionList?pjid=" + pjid + "&usid=" + usid + "&pType=" + pType + "&pSize=" + psize + "&pIndex=" + pindex); }
    static getPostPermissionListUrl(pjid: number, userIds: string, pType: number): string { return WebapiConfig.geturl("api/project/PostPermission?pjid=" + pjid + "&userIds=" + userIds + "&pType=" + pType); }
    //api  数据部分 api/role
    static getRoleGetUrl(id: GUID): string { return WebapiConfig.geturl("api/role/Get?id=" + id); }
    static getRoleSetUrl(): string { return WebapiConfig.geturl("api/role/Post"); }
    static getRoleListUrl(): string { return WebapiConfig.geturl("api/role/GetList"); }
    //api  数据部分 api/Priority
    static getPriorityGetUrl(id: number): string { return WebapiConfig.geturl("api/Priority/Get?id=" + id); }
    static getPrioritySetUrl(): string { return WebapiConfig.geturl("api/Priority/Post"); }
    static getPriorityListUrl(): string { return WebapiConfig.geturl("api/Priority/GetList"); }
    //api  数据部分 api/status
    static getStatusGetUrl(id: number): string { return WebapiConfig.geturl("api/status/Get?id=" + id); }
    static getStatusSetUrl(): string { return WebapiConfig.geturl("api/status/Post"); }
    static getStatusListUrl(): string { return WebapiConfig.geturl("api/status/GetList"); }
    //api  数据部分 api/function
    static getFunctionGetUrl(id: number): string { return WebapiConfig.geturl("api/function/Get?id=" + id); }
    static getFunctionSetUrl(): string { return WebapiConfig.geturl("api/function/Post"); }
    static getFunctionListUrl(): string { return WebapiConfig.geturl("api/function/GetList"); }
    static getFuncPageNameDicUrl(): string { return WebapiConfig.geturl("api/function/GetFuncNames"); }
    //api  数据部分 api/funcfields
    static getFuncfieldsGetUrl(id: number): string { return WebapiConfig.geturl("api/funcfields/Get?id=" + id); }
    static getFuncfieldsSetUrl(): string { return WebapiConfig.geturl("api/funcfields/Post"); }
    static getFuncfieldsListUrl(funcId: number, pIndex: number, psize: number): string { return WebapiConfig.geturl("api/funcfields/GetList?funcId=" + funcId + "&pIndex=" + pIndex + "&psize=" + psize); }
    static getFieldTypeNamesUrl(): string { return WebapiConfig.geturl("api/funcfields/GetFuncNames"); }
    static getFuncFieldStatusUrl(funcid: number): string { return WebapiConfig.geturl("api/funcfields/GetFieldStatus?funcid=" + funcid); }
    //api  数据部分 api/IISDB
    static GetIISDBGetUrl(): string { return WebapiConfig.geturl("api/IISDB/GetIIS"); }
    static PostIISCreateUrl(): string { return WebapiConfig.geturl("api/IISDB/CreateIIS"); }
    static PostDBInitUrl(): string { return WebapiConfig.geturl("api/IISDB/InitDB"); }
    //api  数据部分 api/cam
    static GetCamDBGetUrl(ogCat: string, pIndex: number, pSize: number): string { return WebapiConfig.geturl("api/CamDB/Get?ogCat=" + ogCat + "&pIndex=" + pIndex + "&pSize=" + pSize); }
    static GetCamUrl(id: number): string { return WebapiConfig.geturl("api/CamDB/GetCam?id=" + id); }
    static PostCamSettingUrl(): string { return WebapiConfig.geturl("api/CamDB/Post"); }
    //api  数据部分 api/notify
    static GetNotifyGetUrl(Flag: string, filterUsersValue: string, PageIndex: number, pageSize: number): string { return WebapiConfig.geturl("api/notify/Get?Flag=" + Flag + "&filterUsersValue=" + filterUsersValue + "&PageIndex=" + PageIndex + "&pageSize=" + pageSize); }
    static GetNotifyDetailUrl(id: number): string { return WebapiConfig.geturl("api/notify/GetDetail?id=" + id); }
    static PostNotifyUrl(id: number): string { return WebapiConfig.geturl("api/notify/Post?id=" + id); }
    //api  数据部分 api/relationship
    static GetAddShipUrl(bugid: number, bugid2: number, ship: number, txt: string): string { return WebapiConfig.geturl("api/relationship/AddShip?bugid=" + bugid + "&bugid2=" + bugid2 + "&ship=" + ship + "&txt=" + txt); }
    static GetRemoveShipUrl(bugid: number, bugid2: number): string { return WebapiConfig.geturl("api/relationship/RemoveShip?bugid=" + bugid + "&bugid2=" + bugid2); }
    static GetShipListUrl(id: number): string { return WebapiConfig.geturl("api/relationship/GetShipList?id=" + id); }
    static GetAddSubUrl(bugid: number, usid: number): string { return WebapiConfig.geturl("api/relationship/AddSub?bugid=" + bugid + "&usid=" + usid); }
    static GetRemoveSubUrl(bugid: number, usid: number): string { return WebapiConfig.geturl("api/relationship/RemoveSub?bugid=" + bugid + "&usid=" + usid); }
    static GetBugSubListUrl(id: number): string { return WebapiConfig.geturl("api/relationship/GetBugSubList?id=" + id); }
    static GetSubUserListUrl(id: number): string { return WebapiConfig.geturl("api/relationship/GetSubUserList?id=" + id); }
    static GetBugMarkUrl(id: number, type: number): string { return WebapiConfig.geturl("api/relationship/GetBugMark?id=" + id + "&type=" + type); }
    static PostMarksUrl(bgid: number, markId: number): string { return WebapiConfig.geturl("api/relationship/PostMarks?bgid=" + bgid + "&markId=" + markId); }
    static PostFlagUrl(bgId: number, flag: number): string { return WebapiConfig.geturl("api/relationship/PostFlag?bgId=" + bgId + "&flag=" + flag); }
    static MergeBugUrl(fromid: number, intoid: number): string { return WebapiConfig.geturl("api/relationship/MergeBug?fromid=" + fromid + "&intoid=" + intoid); }
    static MergePostUrl(fromid: number, intoid: number): string { return WebapiConfig.geturl("api/relationship/MergePost?fromid=" + fromid + "&intoid=" + intoid); }

    //api  数据部分 api/auto
    static GetCreateIndexAll(us: string, pw: string): string { return WebapiConfig.geturl("api/Auto/CreateIndexAll?us=" + us + "&pw=" + pw); }
    static GetBarCordImg(QrStr: string, size: number, checkbug: boolean = false): string { return WebapiConfig.geturl("api/Auto/GetBarCordImg?QrStr=" + QrStr + "&size=" + size + "&checkbug=" + checkbug); }
    static RebuildUserTempNew(): string { return WebapiConfig.geturl("api/Auto/RebuildUserTempNew"); }
    static RebuildFunc(id: number): string { return WebapiConfig.geturl("api/Auto/RebuildFunc?id=" + id); }
    static RebuildView(id: number): string { return WebapiConfig.geturl("api/Auto/RebuildView?id=" + id); }
    static ExportAttach(): string { return WebapiConfig.geturl("api/Auto/ExportAttach"); }
    static Export(t: string): string { return WebapiConfig.geturl("api/Auto/Export?t=" + t); }
    static Timeing(Stid: number = 0, usid: number = -1, detail: number = 0): string { return WebapiConfig.geturl("api/Auto/Timeing?Stid=" + Stid + "&usid=" + usid + "&detail=" + detail); }
    static TaskEveryDay(): string { return WebapiConfig.geturl("api/Auto/TaskEveryDay"); }

    //api  数据部分 api/ajax
    static PostEvent(): string { return WebapiConfig.geturl("api/ajax/PostEvent"); }
    static PostFile(id: number): string { return WebapiConfig.geturl("api/ajax/PostFile?id=" + id); }
    static ViewThumb(bugid: number, size: number): string { return WebapiConfig.geturl("api/ajax/MiddleViewThumb?bugid=" + bugid + "&size=" + size); }
    static SelectFeildsFromTree(callBack: string, selectIds: string, fuctype: number): string { return WebapiConfig.geturl("api/ajax/SelectFeildsFromTree?callBack=" + callBack + "&selectIds=" + selectIds + "&fuctype=" + fuctype); }
    static AllProjectTree(callBack: string, ids: string, title: string): string { return WebapiConfig.geturl("api/ajax/AllProjectTree?callBack=" + callBack + "&ids=" + ids + "&title=" + title); }
    static SelectAllFromTree(callBack: string, type: string, fill: string, selval: string = ""): string { return WebapiConfig.geturl("api/ajax/SelectAllFromTree?callBack=" + callBack + "&type=" + type + "&fill=" + fill + "&selval=" + selval); }
    static SelectAssignToFromTree(projectSelect: number, orgSelect: number, callBack: string, bugid: number, selectIds: string = ""): string { return WebapiConfig.geturl("api/ajax/SelectAssignToFromTree?projectSelect=" + projectSelect + "&orgSelect=" + orgSelect + "&callBack=" + callBack + "&bugid=" + bugid + "&selectIds=" + selectIds); }
    static SelfAutoSubScribersTree(callBack: string, title: string, ids: string, usid: number): string { return WebapiConfig.geturl("api/ajax/SelfAutoSubScribersTree?callBack=" + callBack + "&title=" + title + "&ids=" + ids + "&usid=" + usid); }
    static GetProjectPermissionBy(projectid: number, usid: number, permissionType: number): string { return WebapiConfig.geturl("api/ajax/GetProjectPermissionBy?projectid=" + projectid + "&usid=" + usid + "&permissionType=" + permissionType); }
    static GetBugKeyWords(bugId: number): string { return WebapiConfig.geturl("api/ajax/GetBugKeyWords?bugId=" + bugId); }
    static GetMeetingExsit(id: number): string { return WebapiConfig.geturl("api/ajax/GetMeetingExsit?id=" + id); }
    static EndMeeting(id: number, bgid: number): string { return WebapiConfig.geturl("api/ajax/EndMeeting?id=" + id + "&bgid=" + bgid); }
    static RebuildMeeting(id: number, postId: number): string { return WebapiConfig.geturl("api/ajax/RebuildMeeting?id=" + id + "&postId=" + postId); }
    static GoToMeeting(id: number, bgid: number): string { return WebapiConfig.geturl("api/ajax/GoToMeeting?id=" + id + "&bgid=" + bgid); }
    static GetPlayBlack(id: number): string { return WebapiConfig.geturl("api/ajax/GetPlayBlack?id=" + id); }
    static CloseMasterDetails(id: number): string { return WebapiConfig.geturl("api/ajax/CloseMasterDetails?id=" + id); }
    static DeleteComment(id: number): string { return WebapiConfig.geturl("api/ajax/DeleteComment?id=" + id); }

    //api  数据部分 api/hostsetting
    static GetNamesUrl(actid: number): string { return WebapiConfig.geturl("api/hostsetting/GetNames?actid=" + actid); }
    static GetMobileUrl(actid: number): string { return WebapiConfig.geturl("api/hostsetting/GetMobile?actid=" + actid); }
    static GetPcUrl(actid: number): string { return WebapiConfig.geturl("api/hostsetting/GetPc?actid=" + actid); }
    static PostSetMobileUrl(mobile: string, actid: number): string { return WebapiConfig.geturl("api/hostsetting/SetMobile?mobile=" + mobile + "&actid=" + actid); }
    static PostSetPcUrl(pc: string, actid: number): string { return WebapiConfig.geturl("api/hostsetting/SetPc?pc=" + pc + "&actid=" + actid); }

}