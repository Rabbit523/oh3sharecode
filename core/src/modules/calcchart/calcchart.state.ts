import { StringKeyValue } from '../../shared/models/common/keyvalue';
import { ChartDataArray } from '../../shared/models/webapi/chart/chartdataArray';

export interface CalcChartState {
    firstLoad: boolean;
    defaultArray: Array<string>;
    CheckBoxDataArray: Array<StringKeyValue>;
    dataArray: Array<ChartDataArray>;
    navParadata: any;
    data: Array<ChartDataArray>;
    CalcD3: string;
}

export let initialCalcChartState: CalcChartState = {
    firstLoad: true,
    defaultArray: ["status", "project"],
    CheckBoxDataArray: new Array<StringKeyValue>(),
    dataArray: new Array<ChartDataArray>(),
    navParadata: {},
    data: [], CalcD3: ""
};
