import { Component } from '@angular/core';
import { AlertController, Events, ModalController, NavParams, PopoverController, ViewController, MenuController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as coreHeart from 'oneheart-core';
import { EventComment } from '../event-edit/event-comment';
import { EventEditPage } from '../event-edit/event-edit';
import { EventEditProblemPage } from '../event-edit/event-editproblem';
import { EventEditTaskPage } from '../event-edit/eventedittask';
import { EventReportProblemPage } from '../event-edit/event-reportproblem';
import { EventChildTask } from '../event-edit/eventchildtask';
import { ProblemComplate } from '../event-edit/problemcomplate';
import { EventDetailBasePage } from './event-detailbase';
import { MyPopOverPage } from './mypopoverpage';
import { EventConst, StaticCache } from 'oneheart-core';
import { PageUtils } from '../../shared/models/cache/pageutils';
import { WebAppName } from '../../shared/models/cache/webappname';
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html'
})

export class EventDetailPage extends EventDetailBasePage {
    constructor(
        public events: Events, public navParams: NavParams, public sideMenu: MenuController
        , public viewCtrl: ViewController, public modalCtrl: ModalController
        , public popoverCtrl: PopoverController, public alertCtrl: AlertController
        , public userData: coreHeart.StorageService, public store$: Store<coreHeart.AppState>) {
        super(events, navParams, store$);
        this.setdata = this.setMenuSub;
        this.Setting = userData._Storage_Setting;
    }

    unSubScribeOnce(): void {
        this.events.unsubscribe(coreHeart.EventConst.Event_DetailViewChangeClick);
        this.events.unsubscribe(coreHeart.EventConst.System_ShowMessage);

        this.events.unsubscribe(coreHeart.EventConst.Event_DelBugSucc);
        this.events.unsubscribe(coreHeart.EventConst.Event_BugItemUpdated);
    }
    SubScribeOnce(): void {
        this.events.subscribe(coreHeart.EventConst.Event_DetailViewChangeClick, (id: number) => { this.setdetailviewid(id); });
        this.events.subscribe(coreHeart.EventConst.System_ShowMessage, (msg) => { this.events.publish(EventConst.System_Resetwaiting); this.ShowAlertMessage(msg+StaticCache.GlobalMsg); });

        this.events.subscribe(coreHeart.EventConst.Event_BugItemUpdated, () => { this.refreshMainData(); });
        this.events.subscribe(coreHeart.EventConst.Event_DelBugSucc, data => { this.events.publish(EventConst.Event_BugListRefresh); this.dismissView(data); });
    }

    openMenu() {
        this.sideMenu.open("EventDetailContentMenu");
    }
    setMenuSub() {
        this.sideMenu.enable(this.state.ItemMain.ActionType != 5, 'EventDetailContentMenu');
    }
    ionViewDidEnter() {
        this.SubScribeOnce();
    }
    ionViewDidLoad() {
        this.refreshMainData();
    }
    ionViewWillUnload() {
        this.sideMenu.enable(false, 'ChartfiltercontentMenu');
        this.unSubScribeOnce();
    }

    ShowNoteConfirm() {
        this.store$.dispatch(new coreHeart.EventDetailNoteClickAction(""));
    }
    setdetailview(id: number) {
        this.sideMenu.close();
        this.setdetailviewid(id);
    }

    ChangeBugid(id: number) {
        this.sideMenu.close();
        this.dispatchBug(id);
        this.CommentStateInit();
    }
    updateTags(tags: string) {
        this.UpdateEventTags(tags);
    }

    saveComment() {
        if (this.state.ItemMain.ActionType != 5) {
            this.events.unsubscribe(coreHeart.EventConst.Event_NewCommentPosted);
            this.events.subscribe(coreHeart.EventConst.Event_NewCommentPosted, () => { this.CommentStateInit(), this.refreshPostData(); });
            this.store$.dispatch(new coreHeart.EventCommentSaveCommentAction(this.statec));
        }
    }
    DeleteEvent() {
        if (this.state.Bgid > 0) {
            this.store$.dispatch(new coreHeart.EventDetailDeleteEventAction({Bgid:this.state.Bgid,delOrNot:true}));
        }
    }
    EditEvent() {
        var page: any, data: any = { Bgid: this.state.Bgid, header: "编辑 " }, msg = "";
        switch (this.state.ItemMain.ActionType) {
            case coreHeart.EventActionType.TeamTask:
            case coreHeart.EventActionType.TeamLocomotive:
                page = EventEditTaskPage;
                break;
            case coreHeart.EventActionType.Problem:
                if (this.state.ItemMain.Item.status != WebAppName.problemNotEditStatus) {
                    msg = "已审核 无法编辑！";
                }
                else {
                    page = EventEditProblemPage;
                }
                break;
            case coreHeart.EventActionType.General:
                page = EventEditPage;
                break;
            default:
                msg = "未定义！";
                break;
        }
        if (msg == "")
            this.PresentNewModal(page, data, r => { if (r) { this.refreshMainData(); } });
        else
            this.ShowAlertMessage(msg);
        this.sideMenu.close();
    }


    TaskTextClick(task: number) {
        this.childTask(task);
    }

    ShowCategoryCheckbox() {
        var Categoryfield = coreHeart.EventDetailJsonHelper.GetAFieldbyCustomFieldNameID(this.state.ItemMain, coreHeart.DBFixed.KeepOnfile);
        if (Categoryfield.custom_LabelName.length > 0) {
            var AlertTilte = Categoryfield.custom_LabelName, SelectedIds = "," + Categoryfield.cd_value + ",";
            this.store$.select(s => s.Dictionary.extdic).take(1).subscribe(
                alldic => {
                    let data = coreHeart.FieldCategoriesBasePage.filter(alldic, "", this.state._search);
                    this.ShowAlertCtrl(data[0].DefineFields, AlertTilte, SelectedIds, coreHeart.DBFixed.KeepOnfile, Categoryfield.id);
                }
            )
        } else {
            this.ShowAlertMessage("请定义后 才能使用..");
        }
    }

    CommandClick(btnkey: any) {
        if (btnkey == coreHeart.EventCommand.Reply) {
            this.EditComment(this.state.Bgid, this.state.ItemMain.ActionType);
        } else {
            switch (this.state.ItemMain.ActionType) {
                case coreHeart.EventActionType.TeamTask:
                case coreHeart.EventActionType.TeamLocomotive://21
                    this.teamTaskWorkFlowBtnClick(btnkey as number);
                    break;
                case coreHeart.EventActionType.Problem:
                    this.ProblemWorkFlowBtnClick(btnkey);
                    break;
                default:
                    this.ShowAlertMessage("没有定义操作！" + this.state.ItemMain.ActionType + this.state.Bgid + btnkey);
                    break;
            }
        }
        this.sideMenu.close();
    }

    private ProblemWorkFlowBtnClick(btnkey: string) {
        let command = <coreHeart.ExcuteAndUpdateCommand>{
            btnkey: btnkey, stName: "", workFlowSt: "", updateAssginToUser: false,
            Bgid: this.state.Bgid, action: this.state.ItemMain.ActionType
        };
        let data = { Bgid: this.state.Bgid, header: btnkey + " ", contentType: "" };
        switch (btnkey) {//             
            case coreHeart.ApplicationProblem.report:
                this.PresentNewModal(EventReportProblemPage, data,
                    r => {
                        if (r) {
                            command.stName = coreHeart.ApplicationProblem.problemstatusreport;
                            command.workFlowSt = coreHeart.ApplicationProblem.problemWorkflowstatusreport;
                            this.store$.dispatch(new coreHeart.EventDetailExcuteCommandAction(command));
                        }
                    });
                break;
            case coreHeart.ApplicationProblem.change:
                command.stName = coreHeart.ApplicationProblem.problemstatuschange;
                command.workFlowSt = coreHeart.ApplicationProblem.problemWorkflowstatuschange;
                this.store$.dispatch(new coreHeart.EventDetailExcuteCommandAction(command));
                break;
            case coreHeart.ApplicationProblem.check:
                data.contentType = "text/plain";
                this.PresentNewModal(EventComment, data,
                    r => {
                        if (r) {
                            command.stName = coreHeart.ApplicationProblem.problemstatuscheck;
                            command.workFlowSt = coreHeart.ApplicationProblem.problemWorkflowstatuscheck;
                            this.store$.dispatch(new coreHeart.EventDetailExcuteCommandAction(command));
                        }
                    });
                break;
            case coreHeart.ApplicationProblem.back:
                data.contentType = "text/html";
                this.PresentNewModal(ProblemComplate, data,
                    r => {
                        if (r) {
                            command.stName = coreHeart.ApplicationProblem.problemstatuschange;
                            command.workFlowSt = coreHeart.ApplicationProblem.problemWorkflowstatusback;
                            this.store$.dispatch(new coreHeart.EventDetailExcuteCommandAction(command));
                        }
                    });
                break;
            case coreHeart.ApplicationProblem.pass:
                data.contentType = "text/html";
                this.PresentNewModal(ProblemComplate, data,
                    r => {
                        if (r) {
                            command.stName = coreHeart.ApplicationProblem.problemstatuscomplate;
                            command.workFlowSt = coreHeart.ApplicationProblem.problemWorkflowstatuscomplate;
                            this.store$.dispatch(new coreHeart.EventDetailExcuteCommandAction(command));
                        }
                    });
                break;
            default:
                this.ShowAlertMessage("无效的操作！" + btnkey);
                break;
        }
    }

    private teamTaskWorkFlowBtnClick(btnkey: number) {
        switch (btnkey) {
            case coreHeart.EventCommand.AddChildTask:
                this.childTask(0);
                break;
            case coreHeart.EventCommand.BugComplate:
                this.bugComplate(true);
                break;
            case coreHeart.EventCommand.BugUnComplate:
                this.bugComplate(false);
                break;
            default:
                this.ShowAlertMessage("无效的操作！" + btnkey);

                break;
        }
    }
    private childTask(tid: number) {
        var fieldId: number = coreHeart.EventDetailJsonHelper.GetAFieldbyCustomFieldNameID(this.state.ItemMain, coreHeart.DBTask.GetTaskUser(this.state.ItemMain.ActionType)).id;
        if (fieldId <= 0) return;
        let model = { Id: this.state.ItemMain.Item.id, Tid: tid, Fid: fieldId } as coreHeart.ChildTaskModel;
        this.PresentNewModal(EventChildTask, model, data => { if (data) { this.refreshTaskData(); } });
    }



    private EditComment(BgId: number, Actionid: number) {
        var data: any = { Bgid: BgId, header: " 评论", contentType: "text/plain" };
        switch (Actionid) {
            case coreHeart.EventActionType.Problem:
                data.header = " 信息";
                break;
        }
        this.PresentNewModal(EventComment, data, data => { if (data) { this.refreshPostData(); } });
    }
    presentPopover(myEvent: any) {
        let popover = this.popoverCtrl.create(MyPopOverPage, {}, { cssClass: "MyPopOverPageClass" });
        popover.present({ ev: myEvent });
    }
    PresentNewModal(page: any, data: any, func?: (refresh: boolean) => void) {
        var editModal = this.modalCtrl.create(page, data);
        editModal.onDidDismiss((refresh: any) => { if (func&&refresh) { func(refresh.data); } });
        editModal.present();
    }
    dismissView(data: any) {
        if (this.viewCtrl)
            this.viewCtrl.dismiss({ data: data });
    }
    protected ShowAlertMessage(msg: string) {
        PageUtils.ShowPromt(this.alertCtrl, msg);
    }
    protected ShowAlertCtrl(data: coreHeart.CategoryNameDto[], AlertTilte: string, SelectedIds: string, strFieIds: string, CategoryfieldId: number) {
        let alert = this.alertCtrl.create();
        data.forEach(x => { alert.addInput({ type: 'checkbox', label: x.Name, value: x.Id + "", checked: SelectedIds.indexOf("," + x.Id + ",") >= 0 }); })
        alert.setTitle(AlertTilte);
        alert.addButton('放弃');
        alert.addButton({ text: '确定', handler: (data: any) => { var selectdata = data.join(","); this.UpdateField01Fixed(strFieIds, this.state.ItemMain.Item.id, CategoryfieldId, selectdata); } });
        alert.present();
    }
}