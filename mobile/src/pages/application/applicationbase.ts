import { Events, NavController } from 'ionic-angular';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';
import { Store } from '@ngrx/store';
import {
    JsonDictionary, AppState, BugsListService, EventConst, ActionPageListGroup,
    StaticCache, ApplicationPageListGroup, MenuListsSHOWAPPAction, EventActionType, Utils
} from 'oneheart-core';

export class ApplicationBase extends ApplicationFirstBasePage {

    PageList: ApplicationPageListGroup[] = [];
    constructor(public navCtrl: NavController, public events: Events, public listservice: BugsListService
        , public store$: Store<AppState>) {
        super(navCtrl, store$);
        this.store$.select(s => s.menulist.Page_App).subscribe(state => this.PageList = state);
        this.InitAppPageList();
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(EventConst.Event_BugListCountChange);
    }
    ngOnInit(): void {
        this.events.subscribe(EventConst.Event_BugListCountChange, () => {
            this.SubscribeCompany();
        });
    }
    InitAppPageList() {
        let list: ActionPageListGroup[] = this.SetApplicationPageList();
        this.PageList = this.ProcessPageList(list, this.appPageNameAction);
        this.store$.dispatch(new MenuListsSHOWAPPAction(this.PageList));
        this.SubscribeCompany();
    }
    //页面展示
    tableOrList: boolean = true;
    toggletableOrList() {
        this.tableOrList = !this.tableOrList;
    }

    itemOpenModel(enumId: string) {
        this.appPageNameAction[enumId].action();
    }
    private appPageNameAction: JsonDictionary<any> = {
        "myunfinished": { id: "myunfinished", calc: true, action: () => { this.openEventListPager("myunfinished", ApplicationFirstBasePage.MyUnfinished) } },
        "supervise": { id: "supervise", calc: true, action: () => { let json = ApplicationFirstBasePage.MyAttention, userfirstName = StaticCache.Config.PersonalizationJson.ClaimData.UsFirstname; json.Asto = "NOT," + userfirstName; json.RpBy = "," + userfirstName; this.openEventListPager("supervise", json) } },
        "teamevent": { id: "teamevent", calc: true, action: () => { this.openEventListPager("teamevent", ApplicationFirstBasePage.TeamUnfinished) } },
        "allevent": { id: "allevent", calc: true, action: () => { this.openEventListPager("allevent", ApplicationFirstBasePage.AllEvents) } },
        "allproblem": { id: "allproblem", calc: true, action: () => { this.openEventPagerProblem("allproblem", ApplicationFirstBasePage.ProblemPageType.allProblem, "所有问题") } },
        "myreport": { id: "myreport", calc: true, action: () => { this.openEventPagerProblem("myreport", ApplicationFirstBasePage.ProblemPageType.MyReportProblem, "我上报的问题") } },
        "dispatch": { id: "dispatch", calc: true, action: () => { this.openEventPagerProblem("dispatch", ApplicationFirstBasePage.ProblemPageType.DispatchingProblem, "审核问题") } },
        "fixing": { id: "fixing", calc: true, action: () => { this.openEventPagerProblem("fixing", ApplicationFirstBasePage.ProblemPageType.FixingProblem, "接受问题") } },
        "closeing": { id: "closeing", calc: true, action: () => { this.openEventPagerProblem("closeing", ApplicationFirstBasePage.ProblemPageType.ClosingProblem, "验收问题") } },
        "calcall": { id: "calcall", calc: false, action: () => { this.openSummaryCalc() } },
        "mytask": { id: "mytask", calc: true, action: () => { let person = StaticCache.Config.UserId; this.openEventListPager("mytask", ApplicationFirstBasePage.GetEventListWithUser(EventActionType.TeamTask, "我的任务", person)); } },
        "mytransfermachine": { id: "mytransfermachine", calc: true, action: () => { let person = StaticCache.Config.UserId; this.openEventListPager("mytransfermachine", ApplicationFirstBasePage.GetEventListWithUser(EventActionType.TeamLocomotive, "我的机调10", person)); } },
        "safetyrules": { id: "safetyrules", calc: false, action: () => { this.openEventListPager("safetyrules", ApplicationFirstBasePage.SecurityRule) } },
        "inspectionrules": { id: "inspectionrules", calc: false, action: () => { this.openEventListPager("inspectionrules", ApplicationFirstBasePage.MaintenanceRule) } },
    };
    SubscribeCompany() { Utils.log("Not ext SubscribeCompany!"); }
    SetApplicationPageList(): ActionPageListGroup[] { Utils.log("Not ext SetApplicationPageList!"); return null; }
}
