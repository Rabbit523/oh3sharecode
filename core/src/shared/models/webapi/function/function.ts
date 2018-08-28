import { IPageResult } from '../ipageresult';
export class SelfDefineFunctions {
    constructor() { this.FunctionEnable = true; this.FunctionShowInQuery = true; this.FunctionExcelModel = " "; }
    id: number;
    FunctionId: number;
    FunctionEnable: boolean;
    FunctionLabel: string;
    FunctionView: string;
    FunctionViewM: string;
    FunctionViewP: string;
    functionGroup: number;
    functionGroupOrder: number;
    CommentEnable: boolean;
    AttachEnable: boolean;
    LocationEnable: boolean;
    TaskEnable: boolean;
    FunctionShowInQuery: boolean;
    FunctionExcelModel: string;
}

export class SelfDefineFunctionsJSON extends IPageResult<SelfDefineFunctions> { }