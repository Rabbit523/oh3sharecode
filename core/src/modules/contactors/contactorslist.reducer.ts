import { ContactorslistActions, ContactorslistActionTypes } from './contactorslist.actions';
import { ContactorslistState, initialContactorslistState } from './contactorslist.state';
import { ContactorOrg } from '../../shared/models/webapi/contactor/contactorperson';

// data
export function contactorslistReducer(state = initialContactorslistState, action: ContactorslistActions): ContactorslistState {
  switch (action.type) {
    case ContactorslistActionTypes.ShowAllContactors:
      return Object.assign({}, state, { contactors: action.payload,contactorsfiltered: action.payload });
    case ContactorslistActionTypes.GetContactorsFailure:
      return Object.assign({}, state, { msg: action.payload });
    case ContactorslistActionTypes.ShowContactorsByName:
      let str: string = action.payload as string;
      if (str!="") {
        let fitered = new Array<ContactorOrg>();
        state.contactors.forEach(contactorOrg => {
          let ys = new ContactorOrg();
          ys.orgKeyName = contactorOrg.orgKeyName;
          ys.orgList = [];
          contactorOrg.orgList.forEach(cs => {
            if (cs.us_firstname.indexOf(str || "") > -1) {
              ys.orgList.push(cs);
            }
          })
          fitered.push(ys);
        })
        return Object.assign({}, state, { contactorsfiltered: fitered });
      }
      else {
        return Object.assign({}, state, { contactorsfiltered: state.contactors });;
      }
    default: return state;
  }
}
// filter function
export function contactorslistfilterReducer(state = (contactorOrg: ContactorOrg) => contactorOrg, action: ContactorslistActions) {
  switch (action.type) {
    // case ContactorslistActionTypes.ShowContactorsByName:
    //   let str: string = action.payload as string;
    //   if (str)
    //     return (contactorOrg: ContactorOrg) => {
    //       let ys = new ContactorOrg();
    //       ys.orgKeyName = contactorOrg.orgKeyName;
    //       ys.orgList = [];
    //       contactorOrg.orgList.forEach(cs => {
    //         if (cs.us_firstname.indexOf(str || "") > -1) {
    //           ys.orgList.push(cs);
    //         }
    //       })
    //       return ys;
    //     };
    //   else
    //     return state;
    default:
      return state;
  }
}