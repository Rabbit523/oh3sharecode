import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import {
    ApplicationPageListGroup, ActionPageListGroup, PageActionModel, DBTask,
    PageActionNumberModel, StaticCache, AppState, JsonDictionary, ConditionEnum,
    EventActionType, ApplicationProblem, JsonDictionaryHelper
} from 'oneheart-core';
import { SummaryCalc } from './summary/summarycalc';
import { EventListPage } from './event-list/event-list';
import { ToDoList } from './firstpage/receivedcomment/todolist';

export class ApplicationFirstBasePage {

    constructor(public navCtrl: NavController, public store$: Store<AppState>) { }

    ProcessPageList(list: ActionPageListGroup[], PageNameAction: JsonDictionary<any>): ApplicationPageListGroup[] {
        let PageList = [];
        list.forEach(element => {
            let _items: PageActionNumberModel[] = [];
            element.items.forEach((it: PageActionModel) => {
                let idact: any = PageNameAction[it.EnumId];
                let model = new PageActionNumberModel(idact.id, it.IconName, it.H_title, it.P_title, it.P_color, idact.calc);
                model.Count = "0";
                _items.push(model);
            });
            PageList.push(new ApplicationPageListGroup(element.G_title, _items));
        });
        return PageList;
    }

    openEventPagerProblem(id: string, pptype: number, pageTitle: string) {
        var data = ApplicationFirstBasePage.GetProblemPageParas(pptype, 1, pageTitle, StaticCache.Config.username);
        this.openEventListPager(id, data);
    }
    openEventListPager(id: string, data?: any) {
        //this.store$.dispatch({ type: "XXXX", payload: id });
        this.navCtrl.push(EventListPage, data);
    }
    openTodoListPager(data?: any) {
        this.navCtrl.push(ToDoList, data);
    }
    openSummaryCalc() {
        this.navCtrl.push(SummaryCalc);
    }

    //所有菜单样式定义 点击事件在其他页面
    static receivedlist = new PageActionModel("receivedlist", "text", "收到的评论", "我收到的评论", "primary");
    static waitprocess = new PageActionModel("waitprocess", "timer", "待处理的工作", "{0} 条待处理工作", "rcbg1");
    static extwaitprocess = new PageActionModel("extwaitprocess", "timer", "待处理的问题", "{0} 条待处理问题", "rcbg1");
    static newproblem = new PageActionModel("newproblem", "camera", "录入问题", "发现新问题", "favorite");
    static newtask = new PageActionModel("newtask", "checkmark-circle", "新建任务", "分配事务，逐一跟踪", "rcbg3");
    static newTransfermachine = new PageActionModel("newTransfermachine", "speedometer", "新建机调10", "新建机调10", "secondary");
    static newgeneral = new PageActionModel("newgeneral", "add-circle", "创建事务", "分配事务，逐一跟踪", "rcbg3");
    static myunfinished = new PageActionModel("myunfinished", "contact", "我未完成", "我未完成的事务", "rcbg1");
    static supervise = new PageActionModel("supervise", "time", "督办事务", "需要督办的事务", "rcbg1");
    static teamevent = new PageActionModel("teamevent", "contacts", "团队工作", "团队事务协作，提高工作效率", "primary")
    static allevent = new PageActionModel("allevent", "help-buoy", "所有事务", "支持多种视图查看模式", "primary");
    static allproblem = new PageActionModel("allproblem", "help-circle", "所有问题", "所有问题", "primary");
    static myreport = new PageActionModel("myreport", "contact", "我上报的问题", "我上报的问题", "rcbg1");
    static dispatch = new PageActionModel("dispatch", "arrow-dropdown-circle", "问题审核", "审核问题并分配负责人", "primary");
    static fixing = new PageActionModel("fixing", "refresh-circle", "问题接受", "负责人接收处理问题", "primary");
    static closeing = new PageActionModel("closeing", "checkmark-circle", "审核验收", "问题通过与驳回", "primary");
    static calcall = new PageActionModel("calcall", "ios-pie-outline", "综合统计", "所有问题综合统计", "primary");
    static mytask = new PageActionModel("mytask", "contact", "我的任务", "我的任务", "primary");
    static mytransfermachine = new PageActionModel("mytransfermachine", "speedometer", "我的机调10", "我的机调10", "primary");
    static safetyrules = new PageActionModel("safetyrules", "warning", "安规", "安全工作规程", "favorite");
    static inspectionrules = new PageActionModel("inspectionrules", "hammer", "检规", "检修规程", "favorite");


    // all menuBase

    static SecurityRule = { Qid: ConditionEnum.QEAllEvent, FunType: EventActionType.OfficeNote, pj: "安全工作规程", pageTitle: "安全工作规程", PageSize: 15 };
    static MaintenanceRule = { Qid: ConditionEnum.QEAllEvent, FunType: EventActionType.OfficeNote, pj: "检修规程", pageTitle: "检修规程", PageSize: 15 };
    static MyUnfinished = { Qid: ConditionEnum.QEMyUnfinishedEvent, pageTitle: "我未完成", PageSize: 15 };
    static AllEvents = { Qid: ConditionEnum.QEAllEvent, pageTitle: "所有事务", PageSize: 15 };
    static TeamUnfinished = { Qid: ConditionEnum.QEAllEvent, St: "NOT完成", pageTitle: "团队工作", PageSize: 15 };
    static MyAttention = { Qid: ConditionEnum.QEAllEvent, RpBy: "", Asto: "", St: "NOT完成", pageTitle: "督办事务", PageSize: 15 }


    static MyCreated(FunType: number, pageTitle: string): any {
        return { Qid: ConditionEnum.QEAllEvent, FunType: FunType, UsName: StaticCache.Config.username, pageTitle: pageTitle, PageSize: 15 };
    }

    static GetProblemPageParas(pptype: number, pageindex: number, pageTitle: string, username?: string): JsonDictionary<string> {
        var EventParameter: any = Object.assign({}, this.Parametes[pptype]);
        JsonDictionaryHelper.SetAParameter(EventParameter, 'Page', pageindex.toString());
        JsonDictionaryHelper.SetAParameter(EventParameter, 'pageTitle', pageTitle);
        if (pptype == this.ProblemPageType.MyReportProblem) {
            JsonDictionaryHelper.SetAParameter(EventParameter, 'UsName', username);
        }
        return EventParameter;
    }

    static ProblemPageType = {
        DispatchingProblem: 0, FixingProblem: 1, MyReportProblem: 2, ClosingProblem: 3, allProblem: 4, extWaitprocess: 5,
    }

    private static Parametes = [
        { Qid: ConditionEnum.QEAllEvent, FunType: EventActionType.Problem, PageSize: 15, St: ApplicationProblem.problemstatusnew },
        { Qid: ConditionEnum.QEAllEvent, FunType: EventActionType.Problem, PageSize: 15, St: ApplicationProblem.problemstatusreport },
        { Qid: ConditionEnum.QEAllEvent, FunType: EventActionType.Problem, PageSize: 15, St: "NOT" + ApplicationProblem.problemstatuscomplate, UsePj: "0", UsName: "" },
        { Qid: ConditionEnum.QEAllEvent, FunType: EventActionType.Problem, PageSize: 15, St: ApplicationProblem.problemstatuscheck },
        { Qid: ConditionEnum.QEAllEvent, FunType: EventActionType.Problem, PageSize: 15 },
        { Qid: ConditionEnum.QEExtTodoList, FunType: EventActionType.Problem, PageSize: 15, St: ApplicationProblem.problemstatuschange }
    ];

    static GetEventListWithUser(type: number, title: string, person: number): any {
        let fieldkey = DBTask.GetTaskUser(type);
        let obj: any = { Qid: ConditionEnum.QEAllEvent, FunType: type, pageTitle: title, PageSize: 15 };
        obj[fieldkey + type] = person;
        return obj;
    }
}