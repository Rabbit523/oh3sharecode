import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { AppState } from '../app.state';
import { ChartCalcService } from '../../shared/service/webapi/chart.service';
import { EventConst, GlobalActionEnum } from '../../shared/config';
import {
  CalcChartActionTypes, CalcChartGetCheckBoxDataAction, CalcChartGetChartDataAction, CalcChartSetCheckBoxDataAction,
  CalcChartSetChartDataAction, CalcChartSummaryCalcSucAction, CalcChartCalcD3SucAction
} from './calcchart.actions';

@Injectable()
export class CalcChartEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public chartSer: ChartCalcService) { }

  @Effect() CalcChartAction$ = this.actions$
    .ofType(CalcChartActionTypes.SHOW)
    .switchMap(state => {
      return Observable.from([
        new CalcChartGetCheckBoxDataAction(""),
        new CalcChartGetChartDataAction(""),
      ]);
    })

  @Effect() CalcChartGetCheckBoxDataAction$ = this.actions$
    .ofType(CalcChartActionTypes.GetCheckBoxData)
    .switchMap(() => {
      return this.chartSer.GetChartCalcSelector().map(data =>
        new CalcChartSetCheckBoxDataAction(data)
      );
    })

  @Effect() CalcChartChangeChartXYAction$ = this.actions$
    .ofType(CalcChartActionTypes.ChangeChartXY)
    .map(state => {
      return new CalcChartGetChartDataAction("")
    })

  @Effect() CalcChartSetFilterDataAction$ = this.actions$
    .ofType(CalcChartActionTypes.SetFilterData)
    .map(state => {
      return new CalcChartGetChartDataAction("")
    })


  @Effect() CalcChartGetChartDataAction$ = this.actions$
    .ofType(CalcChartActionTypes.GetChartData)
    .withLatestFrom(this.store$.select(s => s.CalcChart))
    .switchMap(([payload, state]) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.chartSer.GetChartListObservable(state.defaultArray[0], state.defaultArray[1], state.navParadata)
        .map(data => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new CalcChartSetChartDataAction(data) })
    })

  @Effect() CalcChartCalcD3Action$ = this.actions$
    .ofType(CalcChartActionTypes.CalcD3)
    .map(toPayload)
    .switchMap(data => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.chartSer.GetBCDataJsonStrUrlObservable(data)
        .map(data => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new CalcChartCalcD3SucAction(data) })
        .catch(err => this.chartSer.handleError("GetChartListObservable", err))
    })


  @Effect() CalcChartSummaryCalcAction$ = this.actions$
    .ofType(CalcChartActionTypes.SummaryCalc)
    .map(toPayload)
    .switchMap(data => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.chartSer.GetChartListObservable(data.t1, data.t2, data.datajson)
        .map(data => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new CalcChartSummaryCalcSucAction(data) })
        .catch(err => this.chartSer.handleError("GetChartListObservable", err))
    })
}