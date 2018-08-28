import { JsonDictionary } from './jsondictionary';
import { DropDownFilterUrlModel } from '../webapi/category/category';

export class EventListParaHelper {
  static ListParas = {
    Page: "Page", Qid: "Qid", Org: "Og", project: "pj", PageSize: "PageSize",
    flag: "flag", Assginto: "Asto", ReportBy: "RpBy", Statu: "St",
    Priority: "Pri", Category: "Ct", ClkCol: "ClkCol", PreSort: "PreSort",
    PreDirt: "PreDirt", CreateDateS: "CreateDateS", CreateDateE: "CreateDateE",
    LastUpdateS: "LastUpdateS", LastUpdateE: "LastUpdateE", ReportOg: "ReportOg",
    ViewType: "ViewType", Markid: "Markid", FunType: "FunType", ExClPj: "ExClPj",
    ExClFun: "ExClFun", UsName: "UsName", UsePj: "UsePj"
  };

  static SetDropDownToData(navParams_data: any, DropDownValue: DropDownFilterUrlModel, fuctype: number) {
    //固定字段
    this.setANavParamsVal(navParams_data, this.ListParas.Assginto, DropDownValue.Asto);
    this.setANavParamsVal(navParams_data, this.ListParas.ReportBy, DropDownValue.RpBy);
    this.setANavParamsVal(navParams_data, this.ListParas.ReportOg, DropDownValue.ReportOg);
    this.setANavParamsVal(navParams_data, this.ListParas.FunType, DropDownValue.FunType);
    this.setANavParamsVal(navParams_data, this.ListParas.Org, DropDownValue.Og);
    this.setANavParamsVal(navParams_data, this.ListParas.project, DropDownValue.pj);
    this.setANavParamsVal(navParams_data, this.ListParas.Category, DropDownValue.Ct);
    this.setANavParamsVal(navParams_data, this.ListParas.Priority, DropDownValue.Pri);
    this.setANavParamsVal(navParams_data, this.ListParas.Statu, DropDownValue.St);
    this.setANavParamsVal(navParams_data, this.ListParas.flag, DropDownValue.flag);
    this.setANavParamsVal(navParams_data, this.ListParas.CreateDateS, DropDownValue.SeacrhDateS);
    this.setANavParamsVal(navParams_data, this.ListParas.CreateDateE, DropDownValue.SeacrhDateE);
    //扩展字段
    if (fuctype >= 0 && DropDownValue.SCt) {
      for (let fields in DropDownValue.SCt) {
        this.setANavParamsVal(navParams_data, fields + fuctype, DropDownValue.SCt[fields]);
      }
    }
  }
  static setANavParamsVal(navParams_data: any, type: string, val: string) {
    if (val != undefined && val != "")
      navParams_data[type] = val;
  }
}