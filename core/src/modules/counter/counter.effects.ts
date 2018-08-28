import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CounterActionTypes, ResetAction, ResetSuccessAction } from './counter.actions';

@Injectable()
export class CounterEffects {
  constructor(    private actions$: Actions  ) { 
  }

  @Effect() resetSuccess$ = this.actions$
    .ofType(CounterActionTypes.RESET)
    //.startWith(new ResetAction()) //init 
    .map(() => {
      return new ResetSuccessAction()
    });
}