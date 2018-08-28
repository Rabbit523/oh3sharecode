import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import {  Slides } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { CreateChartBase } from '../../event-list/chartcalc/createchartbase';

@Component({
    selector: 'summarycalccomponent',
    templateUrl: 'summarycalc.component.html'
})

export class SummaryCalcComponent extends CreateChartBase implements OnChanges {
    @Input() data: coreHeart.CalcChartState;
    ngOnChanges() {
        if (this.data && this.data.data && this.data.data.length > 0) {
            this.loadChart(this.data.data);
        }
    }
    pageSlidesIndex=["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "ninth", "tenth"] ;
    selectedSegment: string = "";
    slides: Array<coreHeart.SummaryCalcModel> = [];//自动生成的要用click事件 不能用ionchange事件
    private loadChart(data: coreHeart.ChartDataArray[]) {
        if (data.length <= 0) {
            data = [{ num: 10, type1: "测试1", type2: "1测试" }, { num: 15, type1: "测试2", type2: "1测试" }, { num: 12, type1: "测试3", type2: "2测试" }]
        }
        let multiData = coreHeart.ChartDataArrayHelper.GroupBy(data, "type2");
        let index = 0;
        if (this.slides.length <= 0) {
            let _slides = [];
            for (var a in multiData) {
                let scm = new coreHeart.SummaryCalcModel();
                scm.id = this.pageSlidesIndex[index];
                scm.Name = multiData[a].name
                scm.barChartId = "barChartId_" + index;
                scm.items = multiData[a].data;
                scm.barChart = undefined;
                _slides.push(scm);
                index++;
            }
            this.slides = _slides;
        } else {
            for (var b in multiData) {
                this.slides[index].items = multiData[b].data;
                index++;
            }
        }
        //异步 等待slides界面加载完毕
        setTimeout(() => { this.slides.forEach(scm => { this.DrawBarChart(scm, "type1"); if (!this.selectedSegment) { this.selectedSegment = scm.id } }); }, 1000);

    }
    private DrawBarChart(element: coreHeart.SummaryCalcModel, priority: string) {
        let data0 = coreHeart.BaseChartHelper.getBarChartData([],element.items, priority);
        let data1 =coreHeart.BaseChartHelper.getBarChartBy(data0);
        if (!element.barChart) {
            element.barChart =this.getChart(data1, { nativeElement: document.getElementById(element.barChartId) });
        }
        else {
            coreHeart.BaseChartHelper.updateChart(element.barChart, data0)
        }
    }    

    @ViewChild('loopSlider') sliderComponent: Slides;
    onSegmentChanged(segmentButtonId: string) {
        let selectedIndex = this.slides.findIndex((slide) => { return slide.id === segmentButtonId; });
        this.selectedSegment = segmentButtonId;
        if (this.slides[selectedIndex]) {
            this.sliderComponent.slideTo(selectedIndex, 1000);
        }
    }

    onSlideChanged(s: Slides) {
        const currentSlide = this.slides[s.getActiveIndex()];
        if (currentSlide) {
            this.selectedSegment = currentSlide.id;
        }
    }
}