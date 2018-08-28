import { ChartDataArray } from '../models/webapi/chart/chartdataArray';
import { Utils } from '../utils/utils';

export class BaseChartHelper {

    static getChart(chartType: any, data: any, options: any) {
        return { type: chartType, data: data, options: options };
    }

    static chartType = {
        Bar: "bar", Line: "line", Pie: "pie", PolarArea: "polarArea",
        Bubble: "bubble", Radar: "radar", Doughnut: "doughnut", HorizontalBar: "horizontalBar"
    };
    static RgbaColorArrays: Array<string> = ['rgba(228, 26, 28, #)', 'rgba(55, 126, 184, #)', 'rgba(75, 175, 74, #)', 'rgba(255, 172, 0, #)', 'rgba(255, 255, 51, #)', 'rgba(247, 129, 191, #)', "rgba(153, 153, 153, #)", "rgba(152, 78, 163, #)", "rgba(166, 86, 40, #)"];
    static RgbaColorArrays2: Array<string> = ['rgba(0, 118, 174, #)', 'rgba(255, 116, 0, #)', 'rgba(0, 161, 59, #)', 'rgba(239, 0, 0, #)', 'rgba(158, 99, 181, #)', 'rgba(152, 82, 71, #)', "rgba(246, 110, 184, #)", "rgba(127, 124, 119, #)", "rgba(194, 189, 44, #)"];
    static ColorBlack: string = "#000000";
    static ColorWhite: string = "#ffffff";
    static GetRgbaColor(index: number, opacity: number): string { var i = index % BaseChartHelper.RgbaColorArrays.length; return BaseChartHelper.RgbaColorArrays[i].replace(/#/g, opacity.toString()); }
    static GetRgbaColors(lenght: number, opacity: number): Array<string> { var val: Array<string> = []; for (var i = 0; i < lenght; i++) { val.push(BaseChartHelper.GetRgbaColor(i, opacity)) } return val; }

    static updateChart(chart: any, data: any) {
        chart.data.labels = data.labels;
        chart.data.datasets = data.datasets;
        chart.update();
    }
    static getLineChart(_dataArray: Array<ChartDataArray>) {
        var data = BaseChartHelper.getLineChartData(_dataArray);
        let options = { legend: { position: 'top' } };
        return BaseChartHelper.getChart(BaseChartHelper.chartType.Line, data, options);
    }
    static getBarChart(_dataArray: Array<ChartDataArray>) {
        var data = BaseChartHelper.getBarChartData([],_dataArray);
        return BaseChartHelper.getBarChartBy(data);
    }
    static getBarChartBy(data: any) {
        let options = { scales: { xAxes: [{ ticks: { beginAtZero: true } }] }, legend: { position: 'top' } };//yAxes: [{ ticks: { beginAtZero: true }}], 
        return BaseChartHelper.getChart(BaseChartHelper.chartType.HorizontalBar, data, options);
    }
    static getPieChart(_dataArray: Array<ChartDataArray>) {
        var data = BaseChartHelper.getPieChartData([],_dataArray);
        var option = { legend: { position: 'right' } };
        return BaseChartHelper.getChart(BaseChartHelper.chartType.Pie, data, option);
    }
    static getDoughnutChart(data: any, num: number = 2) {
        var option = { legend: { position: 'bottom' }, rotation: num * Math.PI, circumference: num * Math.PI };
        return BaseChartHelper.getChart(BaseChartHelper.chartType.Doughnut, data, option);
    }
    static getRadarChart(_dataArray: Array<ChartDataArray>) {
        var data = BaseChartHelper.getRadarChartData(_dataArray);
        let options = { scale: { ticks: { beginAtZero: true } }, legend: { position: 'top' } };//reverse: true, 
        return BaseChartHelper.getChart(BaseChartHelper.chartType.Radar, data, options);
    }

    static getLineChartData(_dataArray: Array<ChartDataArray>): any {
        var col = ChartDataArrayHelper.getObjectByCol(_dataArray, "type1");
        var row = ChartDataArrayHelper.getObjectByCol(_dataArray, "type2");
        let twoM = ChartDataArrayHelper.InitDatatable(ChartDataArrayHelper.getObjectLength(col), ChartDataArrayHelper.getObjectLength(row));
        _dataArray.forEach((element: any) => {
            twoM[row[element["type2"]]][col[element["type1"]]] = element.num;
        });
        var _datasets: Array<any> = new Array<any>();
        ChartDataArrayHelper.objectToSortedArray([],row, true).forEach((element: any, index: number) => {
            _datasets.push({ label: element, backgroundColor: BaseChartHelper.GetRgbaColor(index, 0.2), data: twoM[row[element]] });
        });
        let data = {
            labels: ChartDataArrayHelper.objectToSortedArray([],col, true),
            datasets: _datasets
        };
        return data;
    }

    static getBarChartData(orderArray:Array<string>,_dataArray: Array<ChartDataArray>, priority: string = "type2"): any {
        var data0 = ChartDataArrayHelper.GetBarChartNameNumData(_dataArray, priority);
        var _label = ChartDataArrayHelper.objectToSortedArray(orderArray,data0, true);
        var _data = ChartDataArrayHelper.objectToSortedArray(orderArray,data0, false);
        let data = {
            labels: _label,
            datasets: [{
                label: "总数",
                data: _data,
                backgroundColor: BaseChartHelper.GetRgbaColors(_data.length, 0.2),
                borderColor: BaseChartHelper.GetRgbaColors(_data.length, 1),
                borderWidth: 1
            }]
        };
        return data;
    }
    static getPieChartData(orderArray:Array<string>,_dataArray: Array<ChartDataArray>, priority: string = "type2"): any {
        var data0 = ChartDataArrayHelper.GetBarChartNameNumData(_dataArray, priority);
        var _label = ChartDataArrayHelper.objectToSortedArray(orderArray,data0, true);
        var _data = ChartDataArrayHelper.objectToSortedArray(orderArray,data0, false);
        let data = {
            labels: _label,
            datasets: [
                {
                    data: _data,
                    backgroundColor: BaseChartHelper.GetRgbaColors(_data.length, 1),
                    hoverBackgroundColor: BaseChartHelper.GetRgbaColors(_data.length, 1)
                }]
        };
        return data;
    }

    static getRadarChartData(_dataArray: Array<ChartDataArray>): any {
        var col = ChartDataArrayHelper.getObjectByCol(_dataArray, "type1");
        var row = ChartDataArrayHelper.getObjectByCol(_dataArray, "type2");
        let twoM = ChartDataArrayHelper.InitDatatable(ChartDataArrayHelper.getObjectLength(col), ChartDataArrayHelper.getObjectLength(row));
        _dataArray.forEach((element: any) => {
            twoM[row[element["type2"]]][col[element["type1"]]] = element.num;
        });
        var _datasets: Array<any> = new Array<any>();
        ChartDataArrayHelper.objectToSortedArray([],row, true).forEach((element: any, index: number) => {
            _datasets.push({
                label: element,
                backgroundColor: BaseChartHelper.GetRgbaColor(index, 0.2),
                borderColor: BaseChartHelper.GetRgbaColor(index, 1),
                pointBackgroundColor: BaseChartHelper.GetRgbaColor(index, 1),
                pointBorderColor: BaseChartHelper.ColorWhite,
                pointHoverBackgroundColor: BaseChartHelper.ColorWhite,
                pointHoverBorderColor: BaseChartHelper.GetRgbaColor(index, 1),
                data: twoM[row[element]]
            });
        });
        let data = {
            labels: ChartDataArrayHelper.objectToSortedArray([],col, true),
            datasets: _datasets
        };
        return data;
    }
}

export class ChartDataArrayHelper {

    static GroupBy(dataArray: ChartDataArray[], priority: string): any {
        var ary: any = [];
        for (var index in dataArray) {
            let dataitem = Object.assign({}, dataArray[index]);
            let _name = dataitem[priority];
            if (!ary[_name]) {
                ary[_name] = { name: _name, data: [] };
            }
            delete dataitem[priority];
            ary[_name].data.push(dataitem);
        }
        return ary;
    }

    static GetBarChartNameNumData(dataArray: Array<any>, priority: string): any {
        var dataName: any = {};
        dataArray.forEach((element: any) => {
            if (dataName[element[priority]])
                dataName[element[priority]] += element.num;
            else
                dataName[element[priority]] = element.num;
        });
        return dataName;
    }

    static objectToSortedArray(sort: Array<string>, _object: any, NameValue: boolean): Array<any> {
        var ary: any = [];
        //存在的按给定
        sort.forEach(aitem => {
            if (_object[aitem]) {
                if (NameValue) ary.push(aitem); else ary.push(_object[aitem]);
            }
        });
        //不存在的直接附加到最后
        for (var aitem in _object) {
            if (sort.indexOf(aitem) == -1) {
                if (NameValue) ary.push(aitem); else ary.push(_object[aitem]);
            }
        }
        return ary;
    }

    static InitDatatable(col: number, row: number): Array<Array<any>> {
        let Datatable: Array<Array<any>> = new Array<Array<any>>();
        for (var i = 0; i < row; i++) {
            Datatable.push(this.InitArray(col, 0));
        }
        return Datatable;
    }
    static InitArray(length: number, _default: any): Array<any> {
        var ary = new Array<any>();
        for (var i = 0; i < length; i++) {
            ary.push(_default);
        }
        return ary;
    }
    static getObjectLength(a: any): number {
        var count = 0;
        for (var i in a) {
            if (a.hasOwnProperty(i)) {
                count++;
            }
        }
        return count;
    }
    static getObjectByCol(dataArray: Array<any>, priority: string): any {
        var dataName: any = {}, i = 0;
        dataArray.forEach((element: any, index: number) => {
            if (dataName[element[priority]] === undefined) {
                dataName[element[priority]] = i;
                i++;
            }
        });
        return dataName;
    }
}

