import { Events, NavController, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import {
    ActionPageListGroup, EventDetailService, AppState, EventConst, ToDoListShowAction, ReceivedListShowAction,
    initialToDoListState, initialReceivedListState, EventActionType,
    JsonDictionary, ApplicationPageListGroup, MenuListsSHOWFIRSTAction, MenuListsSetCountAction, Utils
} from 'oneheart-core';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';
import { EventCreateProblemPage } from '../event-edit/event-createproblem';
import { EventEditPage } from '../event-edit/event-edit';
import { EventEditTaskPage } from '../event-edit/eventedittask';
import { ReceivedList } from './receivedcomment/receivedlist';
import { EventDetailPage } from '../event-detail/event-detail';

export class FirstPageBase extends ApplicationFirstBasePage {
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public events: Events
        , public detailservice: EventDetailService, public store$: Store<AppState>) {
        super(navCtrl, store$);
        this.store$.select(s => s.menulist.Page_first).subscribe(state => this.PageList = state);
    }

    PageList: ApplicationPageListGroup[] = [];

    ngOnDestroy(): void {
        //this.events.unsubscribe(EventConst.Event_NewBugCreatedNavGo);
        this.events.unsubscribe(EventConst.Event_BugListCountChange);
    }
    InitFirstPageList() {
        let list: ActionPageListGroup[] = this.SetfirstPageList();
        this.PageList = this.ProcessPageList(list, this.firstPageNameAction);
        this.store$.dispatch(new MenuListsSHOWFIRSTAction(this.PageList));
        this.SubscribeCompany();
    }
    SubscribeCompany: () => void;
    SetfirstPageList(): ActionPageListGroup[] { Utils.log(" Not ext SetfirstPageList"); return null; }
    ngOnInit(): void {
        this.store$.select(s => s.ReceivedList).subscribe(state => {
            if (state.comments.length > 0)
                this.store$.dispatch(new MenuListsSetCountAction({ receivedlist: { Id: "receivedlist", count: state.comments.length, date: state.comments[0].bp_date } }));
        });
        this.store$.select(s => s.ToDoList).subscribe(state => {
            if (state.Items && state.Items.length > 0)
                this.store$.dispatch(new MenuListsSetCountAction({ waitprocess: { Id: "waitprocess", count: state.count, date: state.Items[0].bg_reported_date } }))
        });
        // this.events.subscribe(EventConst.Event_NewBugCreatedNavGo, () => {
        //     this.openEventPagerProblem("myreport",ProblemEnumPage.ProblemPageType.MyReportProblem);
        // });    
        this.events.subscribe(EventConst.Event_BugListCountChange, () => {
            this.SubscribeCompany();
        });
    }

    SubscribeCompany_TodoAndRecvived() {
        this.store$.dispatch(new ToDoListShowAction(Object.assign({}, initialToDoListState.pager, { pageSize: 1 })));
        this.store$.dispatch(new ReceivedListShowAction(Object.assign({}, initialReceivedListState.pager, { pageSize: 20 })));
    }

    CreateTask() { this.CreateEventOrTask(EventActionType.TeamTask, EventEditTaskPage); }
    CreateTeamLocomotive() { this.CreateEventOrTask(EventActionType.TeamLocomotive, EventEditTaskPage); }
    opennewProblem() { this.CreateEventOrTask(EventActionType.Problem, EventCreateProblemPage); }
    CreateEvent() { this.CreateEventOrTask(EventActionType.General, EventEditPage); }
    receivedComment() { var editModal = this.modalCtrl.create(ReceivedList); editModal.present(); }
    goToEventDetail(bgid: number) {
        this.navCtrl.push(EventDetailPage, { Bgid: bgid });
    }


    itemOpenModel(enumId: string) {
        this.firstPageNameAction[enumId].action();
    }
    private CreateEventOrTask(actiontype: number, Page: any) {
        var modal = this.modalCtrl.create(Page, { Bgid: -1 * actiontype, header: "新增 " });
        modal.onDidDismiss((adata: any) => { if (adata && "data" in adata && adata.data) { this.events.publish(EventConst.Event_BugListCountChange); } });
        modal.present();
    }

    protected firstPageNameAction: JsonDictionary<any> = {
        "newtask": { id: "newtask", calc: false, action: () => { this.CreateTask() } },
        "newTransfermachine": { id: "newTransfermachine", calc: false, action: () => { this.CreateTeamLocomotive() } },
        "newproblem": { id: "newproblem", calc: false, action: () => { this.opennewProblem() } },
        "newgeneral": { id: "newgeneral", calc: false, action: () => { this.CreateEvent() } },
        "receivedlist": { id: "receivedlist", calc: true, action: () => { this.receivedComment() } },
        "waitprocess": { id: "waitprocess", calc: true, action: () => { this.openTodoListPager({ pageTitle: "待处理的工作" }) } },
        "calcall": { id: "calcall", calc: false, action: () => { this.openSummaryCalc() } },
        "myreport": { id: "myreport", calc: true, action: () => { this.openEventPagerProblem("myreport", ApplicationFirstBasePage.ProblemPageType.MyReportProblem, "我上报的问题") } },
        "extwaitprocess": { id: "extwaitprocess", calc: true, action: () => { this.openTodoListPager({ pageTitle: "待处理的问题" }) } }
    };

}