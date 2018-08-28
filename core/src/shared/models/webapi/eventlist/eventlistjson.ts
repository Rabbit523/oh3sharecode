import { StringDictionaryMap } from '../eventdetail/intkeyvalue';
import { IPageResult } from '../ipageresult';
export class BugQueryDto {
    CreateTimeColor: string;
    bgcolor: string;
    flagName: string;
    ActionType: number;
    bg_short_desc: string;
    bg_id: number;
    bu_flag: number;
    bu_note: number;
    pj_name: string;
    og_name: string;
    ct_name: string;
    ReportedOrganizition: string;
    itemGroup: string;
    SeenSpan: string;
    TaskSpan: string;
    maxbp_id: number;
    pr_background_color: string;
    us_firstname_reported: string;
    bg_reported_date: string;
    pr_name: string;
    us_firstname_assigned: string;
    st_name: string;
    st_color: string;
    us_firstname_last_updated: string;
    bg_last_updated_date: string;
    bp_type: string;
    bg_last_updated_content: string;
    us_reported_pic: string;
    bg_reported_user: number;
}

export class BugDtoModel extends BugQueryDto {
    Id: string;
    ThumbImgStr: string;
    TaskList: string[];
    FieldValueDictionary: StringDictionaryMap;

}


export const EventActionType = {
    AllAction: -1,  //不过滤
    General: 0,  //通用事务
    FreeSms: 1,   //免费短信   1
    EatPersonalNote: 2, //个人日志  2
    WorkPlanMaster: 3,  //工作计划  3
    Problem: 4,   //快速反应   4
    OfficeNote: 5, //关键绩效  5
    WorkPlanDetail: 6,  //工作计划  6
    EatPersonalDocument: 7, //个人资料  7
    EatPersonalAlarmOnTime: 8, //个人提醒  8
    EatAskForLeave: 9, //请销假  9
    EatUrgencyLocation: 10,  //烽火令-一呼百应 10
    EatUrgencyReport: 11,//烽火令-现场直报 11
    EatUrgencyCooperate: 12,//烽火令-击鼓传花  12
    EatTeamBroardCast: 13,//烽火令-通告  13
    EatUrgencyLocationDetail: 14,  //烽火令-一呼百应 14
    EatUrgencyReportDetail: 15,//烽火令-现场直报  15
    EatUrgencyCooperateDetail: 16,//烽火令-击鼓传花  16
    EatTeamBroardCastDetail: 17,//烽火令-通告 17
    CustomDefined: 18, //自定义功能  18
    TeamMeeting: 19,//协作视频19
    TeamTask: 20,//任务系统20
    TeamLocomotive: 21,//机调-10 21
}

export class EventListJson extends IPageResult<BugDtoModel>{ }