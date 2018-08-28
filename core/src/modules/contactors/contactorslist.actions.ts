import { Action } from '@ngrx/store';
import { ContactorOrg } from '../../shared/models/webapi/contactor/contactorperson';

export const ContactorslistActionTypes = {
  GetAllContactors: '[Contactorslist] GetAll',
  ShowAllContactors: '[Contactorslist] ShowAll',
  ShowContactorsByName: '[Contactorslist] ShowByName',  
  GetContactorsFailure: '[Contactorslist] GetAllFailure',
  GetContactorsSucess: '[Contactorslist] GetSucess'
};
export class GetAllContactorsAction implements Action {
  type = ContactorslistActionTypes.GetAllContactors;
  constructor(public payload: string) { }
}

export class ShowAllContactorsAction implements Action {
  type = ContactorslistActionTypes.ShowAllContactors;
  constructor(public payload: ContactorOrg[]) { }
}

export class ShowContactorsByNameAction implements Action {
  type = ContactorslistActionTypes.ShowContactorsByName;
  constructor(public payload: string) { }
}

export class GetContactorsFailureAction implements Action {
  type = ContactorslistActionTypes.GetContactorsFailure;
  constructor(public payload: string) { }
}
export class GetContactorsSucessAction implements Action {
  type = ContactorslistActionTypes.GetContactorsSucess;
  constructor(public payload: string) { }
}

export type ContactorslistActions = GetAllContactorsAction | ShowAllContactorsAction | ShowContactorsByNameAction|GetContactorsFailureAction|GetContactorsSucessAction;