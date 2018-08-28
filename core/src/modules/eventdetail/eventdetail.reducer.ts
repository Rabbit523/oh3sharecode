import { Observable } from 'rxjs/Observable';
import { EventDetailActions, EventDetailActionTypes } from './eventdetail.actions';
import { initialEventDetailState, EventDetailState } from './eventdetail.state';
import { AllTasksModel, EventDetailJson } from '../../shared/models/webapi/eventdetail/eventdetailjson';


export function EventDetailReducer(state = initialEventDetailState, vaction: EventDetailActions): EventDetailState {
  switch (vaction.type) {
    case EventDetailActionTypes.SHOW:
      return Object.assign({}, state, { header: vaction.payload.header, postfile: [] });

    case EventDetailActionTypes.SetDetailViewId:
      let id = vaction.payload as number;
      return Object.assign({}, state, { detailviewid: id });

    case EventDetailActionTypes.SetDetailViewIdSucc:
      return Object.assign({}, state, { menuList: vaction.payload });

    case EventDetailActionTypes.RefreshMainDataSucc:
      return Object.assign({}, state, vaction.payload);

    case EventDetailActionTypes.RefreshPostDataSucc:
      return Object.assign({}, state, { Post: vaction.payload });

    case EventDetailActionTypes.RefreshTaskDataSucc:
      let tasks = vaction.payload as AllTasksModel;
      let ItemMain = Object.assign({}, state.ItemMain);
      ItemMain.ExplanationTask = tasks.ExplanationTask;
      ItemMain.ExplanationTaskComplate = tasks.ExplanationTaskComplate;
      return Object.assign({}, state, { ItemMain: ItemMain });

    case EventDetailActionTypes.GetCommandsSucc:
      return Object.assign({}, state, { Commands: vaction.payload });

    case EventDetailActionTypes.GetBugUserDtoSSucc:
      return Object.assign({}, state, { BugUsers: vaction.payload });

    case EventDetailActionTypes.NoteClickSucc:
      let bu = JSON.parse(JSON.stringify(state.BugUsers));
      bu[0].bu_note = 1 - bu[0].bu_note;
      return Object.assign({}, state, { BugUsers: bu });

    case EventDetailActionTypes.UpdateFieldFixedSucc:
      let itemMain = vaction.payload as EventDetailJson;
      return Object.assign({}, state, { ItemMain: itemMain });
    default:
      return state;

  }
}
