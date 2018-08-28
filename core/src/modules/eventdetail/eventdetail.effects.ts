import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkjoin';
import 'rxjs/add/observable/fromPromise';
import { EventDetailState } from './eventdetail.state';
import { AppState } from '../app.state';
import { EventDetailService } from '../../shared/service/webapi/eventdetail.service';
import { EventPostService } from '../../shared/service/webapi/eventpost.service';
import { StorageService } from '../../shared/service/cachedata/storageservice';
import { EventDetailBasePageHelper } from './eventdetailbasepagehelper';
import { EventDetailJson } from '../../shared/models/webapi/eventdetail/eventdetailjson';
import { PostListModel } from '../../shared/models/webapi/eventpost/postlistmodel';
import { KeyIconName } from '../../shared/models/common/keyvalue';
import { EventDetailViewConst } from '../../shared/pages/eventdetailviewtype';
import { EventConst } from '../../shared/config/eventconst';
import { EventDetailJsonHelper } from '../../shared/models/helper/eventdetailjsonhelper';
import { GlobalActionEnum } from '../../shared/config/globalactionenum';
import { DBProblem } from '../../shared/models/webapi/fieldnamefromdb/dbproblem';
import { EventDetailActionTypes, EventDetailRefreshMainDataAction, EventDetailRefreshMainExtendDataAction, EventDetailRefreshMainDataSuccAction, EventDetailRefreshPostDataAction, EventDetailGetCommandsAction, EventDetailGetBugUserDtoSAction, EventDetailRefreshPostDataSuccAction, EventDetailGetCommandsSuccAction, EventDetailGetBugUserDtoSSuccAction, EventDetailRefreshTaskDataAction, EventDetailRefreshTaskDataSuccAction, EventDetailSetDetailViewIdSuccAction, EventDetailNoteClickSuccAction, EventDetailUpdateFieldFixedSuccAction } from './eventdetail.actions';
import { StaticCache } from '../../shared/staticcache';


@Injectable()
export class EventDetailEffects {
  constructor(
    private actions$: Actions, public store$: Store<AppState>,
    public eventdetailservice: EventDetailService, public eventpostservice: EventPostService, public userData: StorageService
  ) { }

  //1
  @Effect() EventDetailAction$ = this.actions$
    .ofType(EventDetailActionTypes.SHOW)
    .map(toPayload)
    .map(state => {
      return new EventDetailRefreshMainDataAction(state.Bgid);
    })

  //2
  @Effect() EventDetailRefreshMainDataAction$ = this.actions$
    .ofType(EventDetailActionTypes.RefreshMainData)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.EventDetail))
    .switchMap(([Bgid, state]) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailservice.GetEventDetail(Bgid)
        .map(response => {
          let newState: EventDetailState = JSON.parse(JSON.stringify(state));
          newState.ItemMain = response as EventDetailJson;
          newState.HeadTitle = response.ActionName;
          newState.Bgid = response.Item.id;
          EventDetailBasePageHelper.InitFileldDisplays(newState);
          EventDetailBasePageHelper.InitDetailView(newState);
          EventDetailBasePageHelper.SetCreatorOrMajor(newState);
          EventDetailBasePageHelper.SetCreateUserInfo_0(newState);
          return new EventDetailRefreshMainExtendDataAction(newState)
        })
        .catch(error => this.eventdetailservice.handleError("GetEventDetail", error))
    })

  //3
  @Effect() EventDetailRefreshMainExtendDataAction$ = this.actions$
    .ofType(EventDetailActionTypes.RefreshMainExtendData)
    .map(toPayload)
    .switchMap(state => {
      let newState = JSON.parse(JSON.stringify(state));
      let drop$ = this.eventdetailservice.webapiGetDropdownChange(newState.ItemMain.Item.project, newState.ItemMain.Item.org, newState.ItemMain.Item.id, newState.ItemMain.PrevItem.assignedto);
      let cateKV$ = this.eventdetailservice.webApiGetCategoryKVDefine(newState.ItemMain.ActionType);
      return Observable.forkJoin(drop$, cateKV$).map(
        ([drop, catekv]) => {
          EventDetailBasePageHelper.SetEventMain_1(newState, drop);
          EventDetailBasePageHelper.SetEventCustoms_2(newState, catekv);
          return new EventDetailRefreshMainDataSuccAction(newState)
        })
    })

  //4
  @Effect() EventDetailRefreshMainDataSuccAction$ = this.actions$
    .ofType(EventDetailActionTypes.RefreshMainDataSucc)
    .map(toPayload)
    .switchMap(newState => {
      let paras = { Bgid: newState.ItemMain.Item.id, action: newState.ItemMain.ActionType };
      if (paras.Bgid > 0) {
        return Observable.from([
          new EventDetailRefreshPostDataAction(paras),
          new EventDetailGetCommandsAction(paras),
          new EventDetailGetBugUserDtoSAction(paras)]
        )
      } else {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
        return this.eventdetailservice.handleNoAction();
      }
    })

  //41
  @Effect() EventDetailRefreshPostDataAction$ = this.actions$
    .ofType(EventDetailActionTypes.RefreshPostData)
    .map(toPayload)
    .switchMap(eventDetailParas => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventpostservice.webapiGetPosts(eventDetailParas.Bgid)
        .map(response => {
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new EventDetailRefreshPostDataSuccAction(response as PostListModel[]);
        })
        .catch(error => this.eventpostservice.handleError("webapiGetPosts", error))
    })

  //42
  @Effect() EventDetailGetCommandsAction$ = this.actions$
    .ofType(EventDetailActionTypes.GetCommands)
    .map(toPayload)
    .switchMap(eventDetailParas => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return EventDetailBasePageHelper.GetCommands(this.eventdetailservice, eventDetailParas).map(
        commands => {
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new EventDetailGetCommandsSuccAction(commands)
        })
        .catch(err => this.eventdetailservice.handleError("GetCommands", err))
    })

  //43
  @Effect() EventDetailGetBugUserDtoSAction$ = this.actions$
    .ofType(EventDetailActionTypes.GetBugUserDtoS)
    .map(toPayload)
    .switchMap(eventDetailParas => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailservice.GetBugUserDtoS(eventDetailParas.Bgid, 1).map(
        bugDtoModel => {
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new EventDetailGetBugUserDtoSSuccAction(bugDtoModel)
        })
        .catch(err => this.eventdetailservice.handleError("GetBugUserDtoS", err))
    })

  //0
  @Effect() EventDetailSetTaskStateAction$ = this.actions$
    .ofType(EventDetailActionTypes.SetTaskState)
    .map(toPayload)
    .switchMap(eventDetailParas => {
      return this.eventdetailservice.TaskComplate(eventDetailParas.action)
        .map(response => {
          return new EventDetailRefreshTaskDataAction(eventDetailParas.Bgid)
        })
        .catch(error => this.eventdetailservice.handleError("TaskComplate", error))
    })

  //0
  @Effect() EventDetailRefreshTaskDataAction$ = this.actions$
    .ofType(EventDetailActionTypes.RefreshTaskData)
    .map(toPayload)
    .switchMap(bgid => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailservice.GetAllBugTasks(bgid)
        .map(response => {
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new EventDetailRefreshTaskDataSuccAction(response)
        })
        .catch(error => this.eventdetailservice.handleError("GetAllBugTasks", error))
    })

  //0
  @Effect() EventDetailBugComplateAction$ = this.actions$
    .ofType(EventDetailActionTypes.BugComplate)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.EventDetail.ItemMain))
    .switchMap(([complate, ItemMain]) => {
      return this.eventdetailservice.SetChecked(ItemMain.Item.id, complate)
        .map(data => {
          if (!data) {
            return new EventDetailRefreshMainDataAction(ItemMain.Item.id);
          }
        })
        .catch(error => this.eventdetailservice.handleError("SetChecked", error))
    })

  @Effect() EventDetailSetDetailViewIdAction$ = this.actions$
    .ofType(EventDetailActionTypes.SetDetailViewId)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.EventDetail.ItemMain))
    .map(([id, ItemMain]) => {
      this.userData.saveDetailViewId(id);
      let menuList = EventDetailViewConst.GetEventDetailMenuFor(ItemMain.ActionType, id);
      return new EventDetailSetDetailViewIdSuccAction(menuList);
    })

  //0
  @Effect() EventDetailExcuteCommandAction$ = this.actions$
    .ofType(EventDetailActionTypes.ExcuteCommand)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.EventDetail))
    .switchMap(([command, state]) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      let fields, statuv;
      state.ItemMain.DropDown.Statuss.forEach(statu => { if (statu.Text.indexOf(command.stName) != -1) { fields = EventDetailJsonHelper.GetAFieldbyCustomFieldNameID(state.ItemMain, DBProblem.WorkFlowStatus).cd_id; statuv = statu.Value; } });
      let et$ = this.eventdetailservice.executeworkflow(command.Bgid, command.btnkey, command.updateAssginToUser);
      let st$ = this.eventdetailservice.SetStatus(state.ItemMain.Item.id, statuv);
      let ct$ = this.eventdetailservice.UpdataACoustomDetail(fields, command.workFlowSt);
      return Observable.forkJoin([et$, st$, ct$]).map(([et, st, ct]) => {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.Event_BugListCountChange });
        return new EventDetailRefreshMainDataAction(command.Bgid);
      }).catch(error => this.eventdetailservice.handleError("executeworkflow_SetStatus_UpdataACoustomDetail", error));
    })

  //0
  @Effect() EventDetailNoteClickAction$ = this.actions$
    .ofType(EventDetailActionTypes.NoteClick)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.EventDetail))
    .switchMap(([str, state]) => {
      return this.eventdetailservice.SetNote(state.ItemMain.Item.id).map(msg => {
        StaticCache.GlobalMsg = msg;
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_ShowMessage });
        return new EventDetailNoteClickSuccAction("");
      }).catch(err => this.eventdetailservice.handleError("SetNote", err));
    });

  //0
  @Effect() EventDetailUpdateFieldFixedAction$ = this.actions$
    .ofType(EventDetailActionTypes.UpdateFieldFixed)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.EventDetail.ItemMain))
    .switchMap(([updateFixedField, stateItemMain]) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailservice.SetExtendSubTable(updateFixedField.BgId, updateFixedField.Fid, updateFixedField.DataStr)
        .map(x => {
          if (x) {
            let newstate = JSON.parse(JSON.stringify(stateItemMain));
            EventDetailJsonHelper.SetAFieldbyCustomFieldNameID(newstate, updateFixedField.StrFieIds, updateFixedField.DataStr);
            StaticCache.GlobalMsg = "设置成功";
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_ShowMessage });
            return new EventDetailUpdateFieldFixedSuccAction(newstate);
          } else {
            StaticCache.GlobalMsg = "设置失败";
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_ShowMessage });
            return this.eventdetailservice.handleNoAction();
          }
        }).catch(err => this.eventdetailservice.handleError("SetExtendSubTable", err));
    });

  //0
  @Effect() EventDetailDeleteEventAction$ = this.actions$
    .ofType(EventDetailActionTypes.DeleteEvent)
    .map(toPayload)
    .switchMap(data => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailservice.DeleteBug(data.Bgid,data.delOrNot)
        .map(res => {
          if (res.Key === "") {
            if(data.delOrNot){
              this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.Event_DelBugSucc });
            }
            else{
              StaticCache.GlobalMsg = res.Value;
              this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_ShowConFirmMessage });
            }            
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          }
          else {
            StaticCache.GlobalMsg = res.Key;
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_ShowMessage });
          }
          return this.eventdetailservice.handleNoAction();
        })
        .catch(error => this.eventdetailservice.handleError("DeleteBug", error));
    });



  @Effect() EventEditUploadPostWithEventAction$ = this.actions$
    .ofType(EventDetailActionTypes.UploadPostWithEvent)
    .map(toPayload)
    .map(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      this.eventdetailservice.webapiPostEdit(state.postfile, state.ItemMain).then(eventstr => {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: eventstr });
      });
      return this.eventdetailservice.handleNoAction();
    });

}