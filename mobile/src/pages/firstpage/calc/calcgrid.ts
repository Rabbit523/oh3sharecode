import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as coreHeart from "oneheart-core";

@Component({
    selector: 'calcgridstatus',
    templateUrl: 'calcgrid.html'
})

export class CalcGridStatusComponents implements OnInit {
    ngOnInit(): void {
        let InitState = Object.assign({}, coreHeart.initialCalcChartState, { navParadata: { Qid: coreHeart.ConditionEnum.QEMyUnfinishedEvent }, defaultArray: ["project", "status"] })
        this.store$.dispatch(new coreHeart.CalcChartShowAction(InitState));
    }
    state: any = [{id:"...",name:0},{id:"...",name:0}];
    constructor(public store$: Store<coreHeart.AppState>) {
        this.store$.select(s => s.CalcChart).subscribe(state => {
            if (state.dataArray.length > 0) {
                setTimeout(() => { this.processChartData(state.dataArray); }, 1000);
            }
        });
    }

    processChartData(data: coreHeart.ChartDataArray[]) {
        let _data =coreHeart.ChartDataArrayHelper.GetBarChartNameNumData(data,"type2");
        this.state = coreHeart.Utils.JsonToIdNameArray(_data);        
    }
}
