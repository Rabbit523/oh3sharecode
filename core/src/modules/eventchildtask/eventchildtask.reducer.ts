import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EventChildTaskActions, EventChildTaskActionTypes } from './eventchildtask.actions';
import { initialEventChildTaskState, EventChildTaskState, EventChildTaskBase } from './eventchildtask.state';

export function EventChildTaskReducer(state = initialEventChildTaskState, action: EventChildTaskActions): EventChildTaskState {
  switch (action.type) {
    case EventChildTaskActionTypes.SHOWSucc:
      let payload = action.payload as EventChildTaskBase;
      let headTitle = (payload.itemEdit.Item.Id > 0 ? "编辑 " : "新增 ") + payload.itemEdit.Item.BugId + " 子任务";
      return Object.assign({}, state, payload, { HeadTitle: headTitle });
    default:
      return state;

  }
}
