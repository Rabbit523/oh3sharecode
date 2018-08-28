import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProjectActions, ProjectActionTypes } from './project.actions';
import { initialProjectState, ProjectState } from './project.state';

export function ProjectReducer(state = initialProjectState, action: ProjectActions): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.GetPermissionListSuc:
      return Object.assign({}, state, { Permission: action.payload });
    case ProjectActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case ProjectActionTypes.GetSuc:
      return Object.assign({}, state, { Project: action.payload });
    case ProjectActionTypes.BarCordNamesSuc:
      return Object.assign({}, state, { BarCode: action.payload });
    case ProjectActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
