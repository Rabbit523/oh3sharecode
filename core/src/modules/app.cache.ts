import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AppState } from './app.state';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class CacheEffects {
    constructor(private actions$: Actions, public store$: Store<AppState>) { }    
}
export const CacheActionTypes = {
    GetCache: '[Cache] GetCache'
}
export class CacheAction implements Action {
    type = CacheActionTypes.GetCache;
}