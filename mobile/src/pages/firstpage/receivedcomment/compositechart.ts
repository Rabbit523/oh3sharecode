import { Chart } from "chart.js"
import { Component, ViewChild, Input } from '@angular/core';
@Component({
    selector: "compositechart",
    templateUrl: "compositechart.html"
})

export class CompositeChart {

    @ViewChild('LineChart') lineCanvas: any;
    @ViewChild('LineChartAxis') yAxisCanvas: any;
    @Input() width:number;
    @Input() height:number;
    @Input() set type(val: string) {
        if (val)
            this._type = val;
        this.ionViewDidLoad();
    }
    get type(): string {
        return this._type;
    }
    _type: string;
    constructor() { }
    ionViewDidLoad() {
        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                { label: "My First dataset", fillColor: "rgba(220,220,220,0.2)", strokeColor: "rgba(220,220,220,1)", pointColor: "rgba(220,220,220,1)", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)", data: [65, 59, 80, 81, 56, 55, 40] },
                { label: "My Second dataset", fillColor: "rgba(151,187,205,0.2)", strokeColor: "rgba(151,187,205,1)", pointColor: "rgba(151,187,205,1)", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(151,187,205,1)", data: [28, 48, 40, 19, 86, 27, 90] }
            ]
        };
        new Chart(this.lineCanvas.nativeElement,
            {
                type: this._type,
                data: data,
                options: {
                    responsive: false,
                    animation: {
                        onComplete: x => { this.AnimationComplete(x) }
                    }
                }
            }
        );
    }

    AnimationComplete = function (x) {
        var sourceCanvas = x.chart.ctx.canvas;
        var copyWidth = x.chart.chartArea.left-5;
        var copyHeight = x.chart.chartArea.bottom+5;
        this.yAxisCanvas.nativeElement.width = copyWidth;
        this.yAxisCanvas.nativeElement.height = copyHeight;
        this.yAxisCanvas.nativeElement.getContext("2d").drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
    }
}