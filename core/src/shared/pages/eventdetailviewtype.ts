import {  IntKeyValueCheck } from "../models/webapi/eventdetail/intkeyvalue";
import { IntKeyValue} from "../models/common/keyvalue";
import { EventActionType } from "../models/webapi/eventlist/eventlistjson";

export class EventDetailViewConst {

  static EventDetailViewtype = {
    eTimeView: 0,
    eChatView: 1,
    eContentView: 2,
    eTableView: 3,
    eFormView: 4,
    eProblem: 5
  }

  static EventDetailViewMenu = [
    '时间视图', //0
    '聊天视图', //1
    '内容视图',//2
    '分栏视图',//3
    '表单视图',//4
    '',
  ]

  static GetEventDetailMenu(): IntKeyValue[] {
    var result = new Array<IntKeyValue>();
    EventDetailViewConst.EventDetailViewMenu.forEach((item, index) => {
      if (item)
        result.push(new IntKeyValue(index, item));
    });
    return result;
  }
  static GetEventDetailViewName(type: number): string {
    return EventDetailViewConst.EventDetailViewMenu[type];
  }
  static GetEventDetailFooter(actiontype: number): number {
    var footerPage: number;
    switch (actiontype) {
      case EventActionType.TeamLocomotive://21        
      case EventActionType.TeamTask://20  
        footerPage = 1;
        break;
      case EventActionType.OfficeNote://5       
      case EventActionType.Problem://4
      case EventActionType.General://0  
      default:
        footerPage = 0;
        break;
    }
    return footerPage;
  }
  static GetEventDetailMenuFor(actiontype: number, viewselected: number): IntKeyValueCheck[] {
    var result = new Array<IntKeyValueCheck>();
    switch (actiontype) {
      case EventActionType.TeamLocomotive://21        
      case EventActionType.TeamTask://20        
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eFormView, this.EventDetailViewtype.eFormView));
        break;
      case EventActionType.OfficeNote://5       
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eContentView, this.EventDetailViewtype.eContentView));
        break;
      case EventActionType.Problem://4
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eProblem, this.EventDetailViewtype.eProblem));
        break;
      case EventActionType.General://0         
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eTimeView, viewselected));
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eChatView, viewselected));
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eContentView, viewselected));
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eTableView, viewselected));
        result.push(EventDetailViewConst.GetAKeyValueCheck(this.EventDetailViewtype.eFormView, viewselected));
        break;
    }
    return result;
  }

  static GetAKeyValueCheck(type: number, viewType: number): IntKeyValueCheck {
    return new IntKeyValueCheck(type, EventDetailViewConst.EventDetailViewMenu[type], viewType == type);
  }
}