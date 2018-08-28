import { Events, Loading, LoadingController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';

export class LoadingBasePageHelper {
    static loading: Loading = null;
    static loadctl: LoadingController;
    static showDebugMsg = false;

    constructor(vloadctl: LoadingController, public events: Events) {
        LoadingBasePageHelper.loadctl = vloadctl;
        LoadingBasePageHelper.subscriptAll(events, this.Waitingcallback, this.Resetwaitingcallback);
    }
    static subscriptAll(events: Events
        , Waitingcallback: (vprogress?: number, vmess?: string) => void
        , Resetwaitingcallback: (msg?: string) => void
    ) {
        events.unsubscribe(coreHeart.EventConst.System_Waiting);
        events.unsubscribe(coreHeart.EventConst.System_Resetwaiting);
        events.subscribe(coreHeart.EventConst.System_Waiting, (vprogress?: number, vmess?: string) => {
            Waitingcallback(vprogress, vmess);
        });
        events.subscribe(coreHeart.EventConst.System_Resetwaiting, (msg) => {
            Resetwaitingcallback(msg);
        });
    }

    Waitingcallback = (vprogress?: number, vmess?: string): void => {
        var msg = "";
        if (vprogress) { msg += vprogress + '%'; }
        if (vmess) { msg += " " + vmess; }
        this.LoadingShowMessage(msg);
    }

    Resetwaitingcallback = (msg?: string): void => {
        setTimeout(() => {
            if (LoadingBasePageHelper.loading) {
                LoadingBasePageHelper.loading.dismiss();
            }
            LoadingBasePageHelper.loading = null;
        }, 400);
    }

    LoadingShowMessage(msg?: string) {
        if (!LoadingBasePageHelper.loading) {
            LoadingBasePageHelper.loading = LoadingBasePageHelper.loadctl.create({ content: '', cssClass: 'myloading' });
        }
        if (LoadingBasePageHelper.showDebugMsg) {
            LoadingBasePageHelper.loading.setContent(msg);
            coreHeart.Utils.log(msg);
        }
        LoadingBasePageHelper.loading.present();
    }
}