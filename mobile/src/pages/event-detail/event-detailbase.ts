import { Events, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import {
    EventDetailJson, EventDetailState, EventCommentState, AppState, EventDetailUploadPostWithEventAction, EventDetailUpdateFieldFixedAction,
    initialEventCommentState, EventDetailShowAction, EventDetailRefreshMainDataAction, EventDetailRefreshPostDataAction,
    EventDetailGetCommandsAction, EventDetailSetDetailViewIdAction, EventDetailRefreshTaskDataAction, EventDetailBugComplateAction, Utils
} from 'oneheart-core';

// 只有 服务、事件、逻辑
export class EventDetailBasePage {
    state: EventDetailState;
    statec: EventCommentState;
    Setting = {};
    setdata = () => { Utils.log("Not definded ext binding") }
    constructor(public events: Events, public navParams: NavParams, public store$: Store<AppState>) {
        this.store$.select(s => s.EventDetail).subscribe(state => { this.state = state, this.setdata() });
        this.dispatchBug(navParams.data.Bgid);
        this.CommentStateInit();
    }
    protected UpdateEventTags(tags: string) {
        let detailJson: EventDetailJson = JSON.parse(JSON.stringify(this.state.ItemMain));
        detailJson.Item.tags = tags;
        this.store$.dispatch(new EventDetailUploadPostWithEventAction(<EventDetailState>{ postfile: [], ItemMain: detailJson }));
    }
    protected CommentStateInit() {
        this.statec = Object.assign({}, initialEventCommentState);
        this.statec.bgId = this.navParams.data.Bgid;
        this.statec.contentType = "text/plain";
    }
    protected dispatchBug(bgid: number) {
        if (this.navParams.data.Bgid != bgid) {
            this.navParams.data.Bgid = bgid;
        }
        let header = "查看 ";
        if (this.navParams.data.header) {
            header = this.navParams.data.header;
        }
        this.store$.dispatch(new EventDetailShowAction({ Bgid: bgid, header: header }));
    }

    protected refreshMainData() {
        this.store$.dispatch(new EventDetailRefreshMainDataAction(this.navParams.data.Bgid))
    }
    protected refreshPostData() {
        this.store$.dispatch(new EventDetailRefreshPostDataAction({ Bgid: this.state.ItemMain.Item.id, action: this.state.ItemMain.ActionType }))
    }
    protected GetCommands(bgid: number, actid: number) {
        this.store$.dispatch(new EventDetailGetCommandsAction({ Bgid: bgid, action: actid }))
    }

    protected setdetailviewid(id: number) {
        this.store$.dispatch(new EventDetailSetDetailViewIdAction(id))
    }
    protected refreshTaskData() {
        this.store$.dispatch(new EventDetailRefreshTaskDataAction(this.state.ItemMain.Item.id))
    }
    protected bugComplate(st: boolean) {
        this.store$.dispatch(new EventDetailBugComplateAction(st));
    }
    protected UpdateField01Fixed(strFieIds: string, bgId: number, fid: number, dataStr: string) {
        this.store$.dispatch(new EventDetailUpdateFieldFixedAction({ StrFieIds: strFieIds, BgId: bgId, Fid: fid, DataStr: dataStr }));
    }
}