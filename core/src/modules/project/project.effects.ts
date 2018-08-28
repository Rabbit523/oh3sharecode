import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { ProjectActionTypes,BarCordNamesSucAction, ProjectShowAction, ProjectDelSucAction, ProjectGetSucAction, ProjectPostSucAction, ProjectGetListSucAction, ProjectGetPermissionListSucAction, PostPermissionProjectSucAction } from './project.actions';
import { ProjectService } from '../../shared/service/webapi/project.service';

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public projectser: ProjectService) { }

  @Effect() ProjectDelAction$ = this.actions$.ofType(ProjectActionTypes.del).map(toPayload)
    .switchMap(id => {
      return this.projectser.DeleteProjectObservable(id).map(x => new ProjectDelSucAction(x))
        .catch(err => this.projectser.handleError("ProjectService.DeleteProjectObservable", err))
    })

  @Effect() ProjectGetAction$ = this.actions$.ofType(ProjectActionTypes.Get).map(toPayload)
    .switchMap(id => {
      return this.projectser.GetProjectObservable(id).map(x => new ProjectGetSucAction(x))
        .catch(err => this.projectser.handleError("ProjectService.GetProjectObservable", err))
    })

  @Effect() BarCordNamesAction$ = this.actions$.ofType(ProjectActionTypes.BarCordNames).map(toPayload)
    .switchMap(data => {
      return this.projectser.GetBarCordNamesObservable().map(x => new BarCordNamesSucAction(x))
        .catch(err => this.projectser.handleError("ProjectService.GetBarCordNamesObservable", err))
    })

  @Effect() ProjectPostAction$ = this.actions$.ofType(ProjectActionTypes.Post).map(toPayload)
    .switchMap(Org => {
      return this.projectser.PostProjectObservable(Org).map(x => new ProjectPostSucAction(x))
        .catch(err => this.projectser.handleError("ProjectService.PostProjectObservable", err))
    })

  @Effect() ProjectGetListAction$ = this.actions$.ofType(ProjectActionTypes.GetList).map(toPayload)
    .switchMap(data => {
      return this.projectser.GetAllProjectObservable(data.funcId, data.index).map(x => new ProjectGetListSucAction(x))
        .catch(err => this.projectser.handleError("ProjectService.GetAllProjectObservable", err))
    })

  @Effect() PermissionListGetListAction$ = this.actions$.ofType(ProjectActionTypes.GetPermissionList).map(toPayload)
    .switchMap(data => {
      return this.projectser.GetPermissionListObservable(data.pjid, data.usid, data.pType, data.index).map(x => new ProjectGetPermissionListSucAction(x))
        .catch(err => this.projectser.handleError("ProjectService.GetPermissionListObservable", err))
    })

  @Effect() PostPermissionProjectAction$ = this.actions$.ofType(ProjectActionTypes.PermissionPost).map(toPayload)
    .switchMap(data => {
      return this.projectser.PostPermissionProjectObservable(data.pjid, data.userids, data.ptype).map(x => new PostPermissionProjectSucAction(x))
        .catch(err => this.projectser.handleError("ProjectService.DeleteProjectObservable", err))
    })
}