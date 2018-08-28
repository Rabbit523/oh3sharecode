
import { EventActionType } from "../models/webapi/eventlist/eventlistjson";
import { StaticCache } from "../staticcache";
import { IntKeyValueCheck } from "../models/webapi/eventdetail/intkeyvalue";

export class EventListItemConst {
  static EventListItemType = { eSimpleText: 0, eSimpleGraph: 1, eStandGraph: 2, eProblemList: 3, eTaskList: 4, eRules: 5 };
  static EventListItemMenu = ['文字', '图文', '标准', '', '', '',];

  static GetEventListDefault(actiontype: number): number {
    StaticCache.Config.ListActionType = actiontype;
    switch (StaticCache.Config.ListActionType) {
      case EventActionType.Problem://4
        StaticCache.Config.ListViewId = this.EventListItemType.eProblemList;
        break;
      case EventActionType.TeamTask://20    
      case EventActionType.TeamLocomotive://21 
        StaticCache.Config.ListViewId = this.EventListItemType.eTaskList;
        break;
      case EventActionType.OfficeNote://5             
        StaticCache.Config.ListViewId = this.EventListItemType.eRules;
        break;
      case EventActionType.General://0
      default:
        StaticCache.Config.ListViewId = this.EventListItemType.eSimpleGraph;
        break;
    }
    return StaticCache.Config.ListViewId;
  }
  static GetEventListMenuFor(ListviewType: number): IntKeyValueCheck[] {
    var result = new Array<IntKeyValueCheck>();
    switch (StaticCache.Config.ListActionType) {
      case EventActionType.Problem://4
        result.push(EventListItemConst.GetAKeyValueCheck(this.EventListItemType.eProblemList, this.EventListItemType.eProblemList));
        break;
      case EventActionType.TeamTask://20    
      case EventActionType.TeamLocomotive://21 
        result.push(EventListItemConst.GetAKeyValueCheck(this.EventListItemType.eTaskList, this.EventListItemType.eTaskList));
        break;
      case EventActionType.OfficeNote://5       
        result.push(EventListItemConst.GetAKeyValueCheck(this.EventListItemType.eRules, this.EventListItemType.eRules));
        break;
      case EventActionType.General://0 
      default:
        result.push(EventListItemConst.GetAKeyValueCheck(this.EventListItemType.eSimpleText, ListviewType));
        result.push(EventListItemConst.GetAKeyValueCheck(this.EventListItemType.eSimpleGraph, ListviewType));
        result.push(EventListItemConst.GetAKeyValueCheck(this.EventListItemType.eStandGraph, ListviewType));
        break;
    }
    return result;
  }

  static GetAKeyValueCheck(type: number, viewType: number): IntKeyValueCheck {
    return new IntKeyValueCheck(type, EventListItemConst.EventListItemMenu[type], viewType == type);
  }
}