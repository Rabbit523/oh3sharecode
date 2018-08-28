import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { EventDetailState, EventDetailParas } from './eventdetail.state';
import { EventFieldDisplayHelper } from '../../shared/models/webapi/eventdetail/eventfielddisplayhelper';
import { EventActionType } from '../../shared/models/webapi/eventlist/eventlistjson';
import { EventDetailViewConst } from '../../shared/pages/eventdetailviewtype';
import { WebapiConfig } from '../../shared/config/webapiconfig';
import { CategoryEnum } from '../../shared/models/webapi/category/category';
import { EventDetailJsonHelper } from '../../shared/models/helper/eventdetailjsonhelper';
import { DropDownJson } from '../../shared/models/webapi/eventdetail/dropdownjson';
import { CustomDropdownDefineModel } from '../../shared/models/webapi/eventdetail/customdropdowndefine';
import { KeyIconName } from '../../shared/models/common/keyvalue';
import { EventDetailService } from '../../shared/service/webapi/eventdetail.service';
import { CommandState } from '../../shared/models/webapi/workflow/commandstate';
import { ApplicationProblem } from '../../shared/models/common/applicationproblem';
import { EventDetailJson } from '../../shared/models/webapi/eventdetail/eventdetailjson';
import { ContactorCacheHelper } from '../../shared/models/helper/contactorcachehelper';
import { CustomFieldsModel } from '../../shared/models/webapi/eventdetail/customdropdowndefine';
import { StaticCache } from '../../shared/staticcache';
import { Utils } from '../../shared/utils/utils';

export const EventCommand = { Reply: 0, AddChildTask: 1, BugComplate: 2, BugUnComplate: 3 }

export class EventDetailBasePageHelper {
  static InitFileldDisplays(state: EventDetailState) {
    state.MainFieldDisplays = EventFieldDisplayHelper.createMainDisplays();
    state.detailCanEdit = true;//是否能编辑
    switch (state.ItemMain.ActionType) {
      case EventActionType.Problem:
        state.ExtFieldDisplays = EventFieldDisplayHelper.createProblemExtDisplays();
        break;
      case EventActionType.TeamTask:
      case EventActionType.TeamLocomotive://21
        state.ExtFieldDisplays = EventFieldDisplayHelper.createTaskLocomotiveDisplays();
        break;
      case EventActionType.General:
        break;
      case EventActionType.OfficeNote:
      default:
        state.detailCanEdit = false;
        break;
    }
  }
  static InitDetailView(state: EventDetailState) {
    let viewname="";
    state.pageFooter = EventDetailViewConst.GetEventDetailFooter(state.ItemMain.ActionType);
    state.menuList = EventDetailViewConst.GetEventDetailMenuFor(state.ItemMain.ActionType, StaticCache.Config.DetailViewId);    
    state.menuList.forEach(x => { if (x.checked) { state.detailviewid = x.key; viewname = x.value; } });
    if (viewname !== EventDetailViewConst.EventDetailViewMenu[state.detailviewid]) { Utils.log("DetailViewId Error"); }
  }

  static SetCreatorOrMajor(state: EventDetailState) {
    var loginUser = StaticCache.Config.UserId;
    state.CreatorOrMajor = Number(state.ItemMain.Item.assignedto) == loginUser || state.ItemMain.reportedUsid == loginUser;
    let search = Object.assign({}, state._search);
    search.bindId = loginUser;
    search.action = state.ItemMain.ActionType;
    search.bindtype = CategoryEnum.PersonCategories;
    state = Object.assign({}, state, { _search: search });
  }
  static SetCreateUserInfo_0(state: EventDetailState) {
    if (state.ItemMain.reportedUsid > 0) {
      let item = ContactorCacheHelper.GetContactorById(state.ItemMain.reportedUsid);
      state.CreatorPicurl = item.UserPic;
      state.CreatorPhoneNo = item.PhoneNo;
    }
  }

  static SetEventMain_1(state: EventDetailState, AssignDropdown: DropDownJson) {
    var AssignToNames = EventDetailJsonHelper.GetTextBy(AssignDropdown.DropDown, state.ItemMain.Item.assignedto.toString());
    state.MainFieldDisplays = EventDetailJsonHelper.ToEventFieldDisplayDictionary(state.ItemMain, AssignToNames);
  }
  static SetEventCustoms_2(state: EventDetailState, arrayT: CustomDropdownDefineModel[]) {
    state.CustomDropdownDefine = arrayT;
    switch (state.ItemMain.ActionType) {
      case EventActionType.Problem:
        state.ExtFieldDisplays = EventDetailJsonHelper.BugProblemTo(state.ItemMain, arrayT);
        break;
      case EventActionType.TeamTask:
      case EventActionType.TeamLocomotive:
        state.ExtFieldDisplays = EventDetailJsonHelper.TaskLocomotive(state.ItemMain);
        break;
      case EventActionType.General:
      case EventActionType.OfficeNote:
      default: break;
    }
  }


  static GetCommands(eventdetailservice: EventDetailService, eventDetailParas: EventDetailParas): Observable<Array<KeyIconName>> {
    let Commands = new Array<KeyIconName>();
    switch (eventDetailParas.action) {
      case EventActionType.Problem:
        return eventdetailservice.loadworkflow(eventDetailParas.Bgid, eventDetailParas.action).map(
          (btns: CommandState) => {
            Commands = Commands.concat(
              EventDetailBasePageHelper.GetFixCommand(eventDetailParas.action),
              EventDetailBasePageHelper.GetWorkFlowCommands(btns)
            );
            return Commands;
          })
          .catch(error => eventdetailservice.handleError("loadworkflow", error))

      case EventActionType.OfficeNote:
        return Observable.from([Commands]);

      case EventActionType.TeamTask://20
      case EventActionType.TeamLocomotive://21            
        Commands = EventDetailBasePageHelper.GetFixCommand(eventDetailParas.action);
        Commands.push(EventDetailBasePageHelper.GetKeyValue(EventCommand.AddChildTask));
        return Observable.from([Commands]);

      default: //默认一个回复 功能
        Commands = EventDetailBasePageHelper.GetFixCommand(eventDetailParas.action);
        return Observable.from([Commands]);
    }

  }



  static EventDetailCommandName = ['评论', '子事务', '已完成', '未完成'];
  static EventDetailCommandIcon = ['text', 'add-circle', 'checkmark-circle', 'close-circle'];
  static GetKeyValue(type: number): KeyIconName {
    return new KeyIconName(type, EventDetailBasePageHelper.EventDetailCommandName[type], EventDetailBasePageHelper.EventDetailCommandIcon[type]);
  }
  static GetFixCommand(actionid: Number): Array<KeyIconName> {
    var Commands = new Array<KeyIconName>();
    Commands.push(EventDetailBasePageHelper.GetKeyValue(EventCommand.Reply));
    return Commands;
  }
  static GetWorkFlowCommands(WorkFlowBtn: CommandState): Array<KeyIconName> {
    var Commands = new Array<KeyIconName>();
    if (WorkFlowBtn.Commands) {
      WorkFlowBtn.Commands.forEach(btn => {
        if (btn) {
          Commands.push(new KeyIconName(btn.key, ApplicationProblem.problemWorkflowscommand[btn.value].name, ApplicationProblem.problemWorkflowscommand[btn.value].icon));
        }
      });
    }
    return Commands;
  }
}

