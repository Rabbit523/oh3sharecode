import { Store } from '@ngrx/store';
import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { CreateChartBase } from '../event-list/chartcalc/createchartbase';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';


@Component({
    selector: 'summarycalc',
    templateUrl: 'summarycalc.html'
})

export class SummaryCalc extends CreateChartBase {
    state: coreHeart.CalcChartState;
    constructor(public events: Events, public store$: Store<coreHeart.AppState>) {
        super()
    }
    ionViewDidLoad() {
        this.store$.select(s => s.CalcChart).subscribe(state => {
            this.state = Object.assign({}, state); this.DrawHalfDoughnutChart(state.data)
        });
        let json = ApplicationFirstBasePage.GetProblemPageParas(ApplicationFirstBasePage.ProblemPageType.allProblem, 1, "综合统计", coreHeart.StaticCache.Config.username);
        
        this.store$.dispatch(new coreHeart.CalcChartSummaryCalcAction({ t1: "asorg", t2: "status", datajson: json }));
    }

    @ViewChild("halfDoughnutCanvas") halfDoughnutCanvas: any;
    halfDoughnutChart: any = undefined;

    private DrawHalfDoughnutChart(data: coreHeart.ChartDataArray[]) {
        var piedata = coreHeart.BaseChartHelper.getPieChartData(["已审核","已验收","处理中","未处理","已处理"],data);
        if (!this.halfDoughnutChart) {
            this.halfDoughnutChart = this.getChart(coreHeart.BaseChartHelper.getDoughnutChart(piedata, 1), this.halfDoughnutCanvas);
        }
        else {
            coreHeart.BaseChartHelper.updateChart(this.halfDoughnutChart, piedata)
        }
    }
}