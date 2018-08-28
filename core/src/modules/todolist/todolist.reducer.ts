import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ToDoListActions, ToDoListActionTypes } from './todolist.actions';
import { initialToDoListState, ToDoListState } from './todolist.state';

export function ToDoListReducer(state = initialToDoListState, action: ToDoListActions): ToDoListState {
  switch (action.type) {
    case ToDoListActionTypes.SHOW:
      return Object.assign({}, state, { pager: action.payload });
    case ToDoListActionTypes.SetTitle:
      return Object.assign({}, state, { pageTitle: action.payload });
    case ToDoListActionTypes.LoadDataSuccess:
      return action.payload as ToDoListState;
    default:
      return state;

  }
}
