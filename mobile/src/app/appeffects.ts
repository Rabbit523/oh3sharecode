import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as coreHeart from 'oneheart-core';


@Injectable()
export class MobileEventEffects {
    constructor(private actions$: Actions, public events: Events) { }
    @Effect()
    PostOKAction$ = this.actions$
        .ofType(coreHeart.GlobalActionEnum.ActionPostOK)
        .map(toPayload)
        .map(payload => {
            return Observable.of("action complate!=>" + payload)
        })

    @Effect()
    PostEorAction$ = this.actions$
        .ofType(coreHeart.GlobalActionEnum.ActionPostEor)
        .map(toPayload)
        .map(payload => {
            return Observable.of("action complate!=>" + payload)
        })

    @Effect()
    XXXXXXAction$ = this.actions$
        .ofType(coreHeart.GlobalActionEnum.Events)
        .map(toPayload)
        .map(payload => {
            this.events.publish(payload); return Observable.of("action complate =>" + payload);
        })

    @Effect()
    ErrorAction$ = this.actions$
        .ofType("handleError")
        .map(toPayload)
        .map(payload => {
            let msg: any = "错误！";
            try { let err = JSON.parse(payload).errmsg; if (err["_body"]) msg = err["_body"];if (err["error"]) msg = err["error"]; } catch (e) { msg = "未知错误！" }
            this.events.publish(coreHeart.EventConst.System_ShowMessage, msg); return <Action>{ type: "", payload: "" };
        })
}