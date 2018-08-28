import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as coreHeart from 'oneheart-core';
import { Http } from '@angular/http';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';

export class TrainData { T_ADD: string; LAT_B: number; LNG_B: number; }

@Component({
    selector: 'testpage',
    templateUrl: 'testpage.html'
})
export class TestPage {

    GetLatMeter(lat: number, dkm: number): number {
        let dnext = 5, dcur, temp, lat1;//中国的纬度是从19-51
        do { lat1 = lat + parseFloat(dnext.toFixed(5)); temp = this.GetDistanceKM(lat1, 0, lat, 0); if (temp > dkm) { dcur = dnext; dnext = dnext / 1.5; } }
        while (temp - dkm >= 0)
        return dcur;
    }
    TrainLatLongJson: Array<TrainData>;
    constructor(public store$: Store<coreHeart.AppState>, public http: Http) {
        this.http.get('assets/i18n/train.json').subscribe(data => { this.TrainLatLongJson = data.json(); });
    }

    Arm: any = { lat: 32.061581, lng: 112.163117, dkm: 10 };
    Selected: Array<string> = [];
    findATrian() {
        this.Selected = [];
        let ds = this.GetLatMeter(this.Arm.lat, this.Arm.dkm);
        this.TrainLatLongJson.forEach(x => {
            if (Math.abs(x.LAT_B - this.Arm.lat) < ds) {
                let data = this.GetDistanceKM(x.LAT_B, x.LNG_B, this.Arm.lat, this.Arm.lng)
                if (data < this.Arm.dkm)
                    this.Selected.push(x.T_ADD + "[" + data.toFixed(5) + "Km(" + ds.toFixed(5) + ")]");
            }
        })
    }

    GetDistanceKM(lat1: number, lng1: number, lat2: number, lng2: number) {
        var radLat1 = lat1 * Math.PI / 180.0, radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2, b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = Math.round(s * 6378.137 * 10000) / 10000;
        return s;
    }

    AutoSystemModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.AutoShowAction(coreHeart.initialAutoState)); },
        CreateIndex: () => { this.store$.dispatch(new coreHeart.GetCreateIndexAllAction({ us: "", pw: "" })); },
        BarCordImg: () => { this.store$.dispatch(new coreHeart.GetBarCordImgAction({ QrStr: "test", size: 300, checkbug: false })); },
        RebuildUser: () => { this.store$.dispatch(new coreHeart.RebuildUserTempNewAction(null)); },
        RebuildFunc: () => { this.store$.dispatch(new coreHeart.RebuildFuncAction(coreHeart.EventActionType.General)); },
        RebuildView: () => { this.store$.dispatch(new coreHeart.RebuildViewAction(coreHeart.EventActionType.General)); },
        GetExportMsg: () => { this.store$.dispatch(new coreHeart.ExportAttachAction(null)); },
        ExportFileDB: () => { this.store$.dispatch(new coreHeart.ExportAction("export")); },
        ExportFileTime: () => { this.store$.dispatch(new coreHeart.ExportAction("convert")); },
        Timeing: () => { this.store$.dispatch(new coreHeart.TimeingAction({ Stid: 0, usid: -1, detail: 0 })); },
        TaskEveryDay: () => { this.store$.dispatch(new coreHeart.TaskEveryDayAction(null)); },
    }
    AjaxModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.AjaxShowAction(coreHeart.initialAjaxState)); },
        AddEventForPython: () => { this.store$.dispatch(new coreHeart.PostEventAction(<coreHeart.PythonPostModel>{})); },
        AddFileForMedia: () => { this.store$.dispatch(new coreHeart.PostFileAction({ id: 0, user: "", pass: "", deviceid: "", file: "" })); },
        AsyncViewThumb: () => { this.store$.dispatch(new coreHeart.ViewThumbAction({ bugid: "0", size: 0 })); },
        SelectFeildsTree: () => { this.store$.dispatch(new coreHeart.SelectFeildsFromTreeAction({ callBack: "", selectIds: "", fuctype: coreHeart.EventActionType.General })); },
        ProjectTree: () => { this.store$.dispatch(new coreHeart.AllProjectTreeAction({ callBack: "", ids: "", title: "" })); },
        SubScribersTree: () => { this.store$.dispatch(new coreHeart.SelfAutoSubScribersTreeAction({ callBack: "", title: "", ids: "", usid: 0 })); },
        OrgTree: () => { this.store$.dispatch(new coreHeart.SelectAllFromTreeAction({ callBack: "", type: "org", fill: "", selval: "" })); },
        UserTree: () => { this.store$.dispatch(new coreHeart.SelectAllFromTreeAction({ callBack: "", type: "user", fill: "", selval: "" })); },
        AssignToTree: () => { this.store$.dispatch(new coreHeart.SelectAssignToFromTreeAction({ projectSelect: 0, orgSelect: 0, callBack: "", bugid: 0, selectIds: "" })); },
        Permission: () => { this.store$.dispatch(new coreHeart.GetProjectPermissionByAction({ projectid: 0, usid: 0, permissionType: 0 })); },
        BugKeyWords: () => { this.store$.dispatch(new coreHeart.GetBugKeyWordsAction(0)); },
        MeetingExsit: () => { this.store$.dispatch(new coreHeart.GetMeetingExsitAction(0)); },
        EndMeeting: () => { this.store$.dispatch(new coreHeart.EndMeetingAction({ id: 0, bgid: 0 })); },
        RebuildMeeting: () => { this.store$.dispatch(new coreHeart.RebuildMeetingAction({ id: 0, postId: 0 })); },
        GoToMeeting: () => { this.store$.dispatch(new coreHeart.GoToMeetingAction({ id: 0, bgid: 0 })); },
        PlayBlack: () => { this.store$.dispatch(new coreHeart.GetPlayBlackAction(0)); },
        CloseBug: () => { this.store$.dispatch(new coreHeart.CloseMasterDetailsAction(0)); },
        DeleteComment: () => { this.store$.dispatch(new coreHeart.DeleteCommentAction(0)); },
    }

    CalcChartModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.CalcChartShowAction(coreHeart.initialCalcChartState)); },
        FirstLoad: () => { this.store$.dispatch(new coreHeart.CalcChartFirstLoadAction(true)); },
        GetCheckBoxs: () => { this.store$.dispatch(new coreHeart.CalcChartGetCheckBoxDataAction("")); },
        GetChartData: () => { this.store$.dispatch(new coreHeart.CalcChartGetChartDataAction("")); },
        ChangeChartXY: () => { this.store$.dispatch(new coreHeart.CalcChartChangeChartXYAction("")); },
        SummaryCalc: () => { this.store$.dispatch(new coreHeart.CalcChartSummaryCalcAction({ t1: "asorg", t2: "status", datajson: ApplicationFirstBasePage.GetProblemPageParas(ApplicationFirstBasePage.ProblemPageType.allProblem, 1, "综合统计", coreHeart.StaticCache.Config.username) })); },
        D3Chart: () => { this.store$.dispatch(new coreHeart.CalcChartCalcD3Action(ApplicationFirstBasePage.GetProblemPageParas(ApplicationFirstBasePage.ProblemPageType.allProblem, 1, "综合统计", coreHeart.StaticCache.Config.username))); }
    }

    HostSettingModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.HostSettingShowAction(coreHeart.initialHostSettingState)); },
        GetNames: () => { this.store$.dispatch(new coreHeart.HostSettingGetNamesAction(coreHeart.EventActionType.General)); },
        GetMobileKeys: () => { this.store$.dispatch(new coreHeart.HostSettingGetMobileAction(coreHeart.EventActionType.General)); },
        GetPcKeys: () => { this.store$.dispatch(new coreHeart.HostSettingGetPcAction(coreHeart.EventActionType.General)); },
        SetMobileKeys: () => { this.store$.dispatch(new coreHeart.HostSettingSetMobileAction({ str: "", actid: coreHeart.EventActionType.General })); },
        SetPcKeys: () => { this.store$.dispatch(new coreHeart.HostSettingSetPcAction({ str: "", actid: coreHeart.EventActionType.General })); },
    }

    TestShipModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.RelationShipShowAction(coreHeart.initialRelationShipState)); },
        MergeGet0: () => { this.store$.dispatch(new coreHeart.RelationShipMergeBugAction({ fromid: 13560, intoid: 0 })); },
        MergeGet1: () => { this.store$.dispatch(new coreHeart.RelationShipMergeBugAction({ fromid: 13560, intoid: 13569 })); },
        MergePost: () => { this.store$.dispatch(new coreHeart.RelationShipPostMergeAction({ fromid: 13560, intoid: 13569 })); },
        BugMarkGet: () => { this.store$.dispatch(new coreHeart.RelationShipBugMarkAction({ id: 13573, type: 1 })); },
        PostMark: () => { this.store$.dispatch(new coreHeart.RelationShipPostMarksAction({ bgid: 13573, markid: 0 })); },
        PostFlag: () => { this.store$.dispatch(new coreHeart.RelationShipPostFlagAction({ bgid: 13573, flag: 0 })); },
        GetSubUser: () => { this.store$.dispatch(new coreHeart.RelationShipSubUserListAction(13573)); },
        AddSubUser: () => { this.store$.dispatch(new coreHeart.RelationShipPostAddSubAction({ bugid: 13573, usid: 1 })); },
        RemoveSubUser: () => { this.store$.dispatch(new coreHeart.RelationShipPostRemoveSubAction({ bugid: 13573, usid: 1 })); },
        GetBugSubList: () => { this.store$.dispatch(new coreHeart.RelationShipBugSubListAction(13573)); },
        GetShipList: () => { this.store$.dispatch(new coreHeart.RelationShipShipListAction(13573)); },
        AddShip: () => { this.store$.dispatch(new coreHeart.RelationShipPostAddShipAction({ bgid: 13573, bugid2: 13564, ship: 1, txt: "备注" })); },
        RemoveShip: () => { this.store$.dispatch(new coreHeart.RelationShipPostRemoveShipAction({ bugid: 13573, bugid2: 13564 })); },
    }

    TestNotifyModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.NotifyShowAction(coreHeart.initialNotifyState)); },
        GetListBy: () => { this.store$.dispatch(new coreHeart.NotifyGetListAction({ flag: 1, filter: "", index: 1 })); },
        ViewNotiy: () => { this.store$.dispatch(new coreHeart.NotifyGetAction(172177)); },
        ChangeState: () => { this.store$.dispatch(new coreHeart.NotifyPostAction(1)); }
    }

    TestCamSetModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.CameraSettingDtoShowAction(coreHeart.initialCameraSettingDtoState)); },
        GetListBy: () => { this.store$.dispatch(new coreHeart.CameraSettingDtoGetListAction({ ogCat: "", pIndex: 1, pSize: 10 })); },
        ViewACam: () => { this.store$.dispatch(new coreHeart.CameraSettingDtoGetAction(1062)); },
        UpdataACam: () => { this.store$.dispatch(new coreHeart.CameraSettingDtoPostAction(<coreHeart.CamSettingCamTimeArea>{})); }
    }

    TestIISDBModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.IISDBShowAction(coreHeart.initialIISDBState)); },
        GetListby: () => { this.store$.dispatch(new coreHeart.IISDBGetListAction({})); },
        InitADB: () => { this.store$.dispatch(new coreHeart.DBPostAction(<coreHeart.NewSiteDb>{})); },
        InitASite: () => { this.store$.dispatch(new coreHeart.IISPostAction(<coreHeart.NewSite>{})); }
    }

    TestFieldModel: any = {
        Init: () => { this.store$.dispatch(new coreHeart.SelfDefineFieldDtoShowAction(coreHeart.initialSelfDefineFieldDtoState)); },
        ViewAField: () => { this.store$.dispatch(new coreHeart.SelfDefineFieldDtoGetAction(5)); },
        GetListBy: () => { this.store$.dispatch(new coreHeart.SelfDefineFieldDtoGetListAction({ pfucid: 0, pIndex: 1, pSize: 10 })); },
        DicGet: () => { this.store$.dispatch(new coreHeart.SelfDefineFieldDtoGetDicAction(null)); },
        SelectItemGet: () => { this.store$.dispatch(new coreHeart.SelfDefineFieldDtoGetSelectAction(0)); },
        UpdateAField: () => { this.store$.dispatch(new coreHeart.SelfDefineFieldDtoPostAction(<coreHeart.SelfDefineFieldDto>{})); }
    }

    TestFunctionModel = {
        Init: () => { this.store$.dispatch(new coreHeart.SelfDefineFunctionsShowAction(coreHeart.initialSelfDefineFunctionsState)); },
        ViewBy: () => { this.store$.dispatch(new coreHeart.SelfDefineFunctionsGetAction(5)); },
        GetListBy: () => { this.store$.dispatch(new coreHeart.SelfDefineFunctionsGetListAction({})); },
        GetDicBy: () => { this.store$.dispatch(new coreHeart.SelfDefineFunctionsGetDicAction({})); },
        Update: () => { this.store$.dispatch(new coreHeart.SelfDefineFunctionsPostAction(<coreHeart.SelfDefineFunctions>{})); }
    }

    TestRoleModel = {
        Init: () => { this.store$.dispatch(new coreHeart.RoleShowAction(coreHeart.initialRoleState)); },
        ViewBy: () => { this.store$.dispatch(new coreHeart.RoleGetAction(new coreHeart.GUID("55b98995-7082-432a-bf8f-e131b5f794e4"))); },
        GetList: () => { this.store$.dispatch(new coreHeart.RoleGetListAction({})); },
        Update: () => { this.store$.dispatch(new coreHeart.RolePostAction(<coreHeart.Role>{})); }
    }

    TestStatusModel = {
        Init: () => { this.store$.dispatch(new coreHeart.StatusShowAction(coreHeart.initialStatusState)); },
        ViewBy: () => { this.store$.dispatch(new coreHeart.StatusGetAction(1)); },
        GetList: () => { this.store$.dispatch(new coreHeart.StatusGetListAction("")); },
        Update: () => { this.store$.dispatch(new coreHeart.StatusPostAction(<coreHeart.StatusDto>{})); }
    }

    testPriorityModel = {
        Init: () => { this.store$.dispatch(new coreHeart.PriorityShowAction(coreHeart.initialPriorityState)); },
        Viewby: () => { this.store$.dispatch(new coreHeart.PriorityGetAction(1)); },
        GetList: () => { this.store$.dispatch(new coreHeart.PriorityGetListAction("")); },
        Update: () => { this.store$.dispatch(new coreHeart.PriorityPostAction(<coreHeart.PriorityDto>{})); }
    }

    testProjectModel = {
        Init: () => { this.store$.dispatch(new coreHeart.ProjectShowAction(coreHeart.initialProjectState)); },
        BarCode: () => { this.store$.dispatch(new coreHeart.ProjectGetAction(1)); },
        ViewBy: () => { this.store$.dispatch(new coreHeart.BarCordNamesAction(null)); },
        GetPjList: () => { this.store$.dispatch(new coreHeart.ProjectGetListAction({ funcId: 0, index: 1 })); },
        GetPerList: () => { this.store$.dispatch(new coreHeart.ProjectGetPermissionListAction({ pjid: 1, usid: -1, pType: 1, index: 1 })); },
        UpdatePer: () => { this.store$.dispatch(new coreHeart.PostPermissionProjectAction({ pjid: 1, userids: "", ptype: 2 })); },
        UpdatePj: () => { this.store$.dispatch(new coreHeart.ProjectPostAction(<coreHeart.ProjectDto>{})); },
        DelPj: () => { this.store$.dispatch(new coreHeart.ProjectDelAction(0)); }
    }

    testOrgModel = {
        Init: () => { this.store$.dispatch(new coreHeart.ORGShowAction(coreHeart.initialORGState)); },
        ViewBy: () => { this.store$.dispatch(new coreHeart.ORGGetAction(1)); },
        GetList: () => { this.store$.dispatch(new coreHeart.ORGGetListAction(1)); },
        Update: () => { this.store$.dispatch(new coreHeart.ORGPostAction(<coreHeart.OrgDto>{})); },
        Del: () => { this.store$.dispatch(new coreHeart.ORGDelAction(0)); }
    }

    testMediaModel = {
        GetList: () => { this.store$.dispatch(new coreHeart.GetListAction(true)); },
        ViewBy: () => { this.store$.dispatch(new coreHeart.GetProtectsAction(65)); },
        GetPlaylist: () => { this.store$.dispatch(new coreHeart.GetShowPlayListAction(<coreHeart.ShowPlayListParas>{ placeid: 65, isActive: true, day: "2018-03-06" })); },
        GetPagedlist: () => { this.store$.dispatch(new coreHeart.GetStaticPagedListAction(<coreHeart.StaticPagedListParas>{ pIndex: 1, pSize: 10, sCam: 65, cStDate: "2018-03-02", cEndDate: "2018-03-05" })); }
    }

    testUserModel = {
        Init: () => { this.store$.dispatch(new coreHeart.UserShowAction(coreHeart.initialUserState)); },
        ViewBy: () => { this.store$.dispatch(new coreHeart.UserGetAction(1)); },
        GetUserList: () => { this.store$.dispatch(new coreHeart.UserListGetAction(<any>{ hideInactiveUser: true, organizatoin: "", filterUsersValue: "", userFirstName: "", pageSize: 10, pageIndex: 1, clickColumnName: "", prevSortColumnName: "", prevDirection: "" })); },
        GetPerList: () => { this.store$.dispatch(new coreHeart.UserPermissionPostAction({ usid: 0, projectids: "", ptype: 1 })); },
        UpdateUser: () => { this.store$.dispatch(new coreHeart.UseSetAction(<coreHeart.UpdateUserMiddleWareModel>{})); },
        ImportFile: () => { this.store$.dispatch(new coreHeart.ImportUserAction("FileObject")); },
    }

}