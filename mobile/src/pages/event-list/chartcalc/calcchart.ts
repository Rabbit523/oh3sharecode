import { Component, ViewChild } from '@angular/core';
import { MenuController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as coreHeart from 'oneheart-core';
import { CreateChartBase } from './createchartbase';
@Component({
    selector: 'calcchart',
    templateUrl: 'calcchart.html'
})
export class CalcChart extends CreateChartBase {

    @ViewChild('barCanvas') barCanvas: any;
    @ViewChild('radarCanvas') radarCanvas: any
    @ViewChild('pieCanvas') pieCanvas: any;
    @ViewChild('lineCanvas') lineCanvas: any;
    barChart: any;
    radarChart: any;
    pieChart: any;
    lineChart: any;

    state: coreHeart.CalcChartState;
    pagefirstLoad = true;
    constructor(private navPara: NavParams, private sideMenu: MenuController, public store$: Store<coreHeart.AppState>) {
        super()
        this.store$.select(s => s.CalcChart).subscribe(state => {
            this.state = Object.assign({}, state)
            if (this.state.dataArray.length > 0) {
                setTimeout(() => { this.processChartData(this.state.dataArray); }, 1000);
            }
        });
    }

    ionViewCanEnter(): void {
        let InitState = Object.assign({}, coreHeart.initialCalcChartState, { navParadata: this.navPara.data })
        this.store$.dispatch(new coreHeart.CalcChartShowAction(InitState));
    }

    ChangeChartXY() {
        this.store$.dispatch(new coreHeart.CalcChartChangeChartXYAction(""));
    }
    setFilterData(data: Array<string>) {
        if (data.length == 2)
            this.store$.dispatch(new coreHeart.CalcChartSetFilterDataAction(data));
        this.sideMenu.close();
    }

    private processChartData(data: coreHeart.ChartDataArray[]) {
        if (this.pagefirstLoad) {
            this.pagefirstLoad = false;
            this.barChart = this.getChart(coreHeart.BaseChartHelper.getBarChart(data), this.barCanvas);
            this.radarChart = this.getChart(coreHeart.BaseChartHelper.getRadarChart(data), this.radarCanvas);
            this.pieChart = this.getChart(coreHeart.BaseChartHelper.getPieChart(data), this.pieCanvas);
            this.lineChart = this.getChart(coreHeart.BaseChartHelper.getLineChart(data), this.lineCanvas);
        } else {
            coreHeart.BaseChartHelper.updateChart(this.barChart, coreHeart.BaseChartHelper.getBarChartData([], data));
            coreHeart.BaseChartHelper.updateChart(this.radarChart, coreHeart.BaseChartHelper.getRadarChartData(data));
            coreHeart.BaseChartHelper.updateChart(this.pieChart, coreHeart.BaseChartHelper.getPieChartData([], data));
            coreHeart.BaseChartHelper.updateChart(this.lineChart, coreHeart.BaseChartHelper.getLineChartData(data));
        }
    }

    ionViewDidEnter() {
        this.sideMenu.enable(true, 'ChartfiltercontentMenu');
    }
    viewWillLeave() {
        this.sideMenu.enable(false, 'ChartfiltercontentMenu');
    }
    openMenu() {
        this.sideMenu.open();
    }
}