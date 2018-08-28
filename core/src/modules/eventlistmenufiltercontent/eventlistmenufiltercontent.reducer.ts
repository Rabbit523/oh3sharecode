import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EventListMenuFilterContentActions, EventListMenuFilterContentActionTypes } from './eventlistmenufiltercontent.actions';
import { initialEventListMenuFilterContentState, EventListMenuFilterContentState } from './eventlistmenufiltercontent.state';
import { StaticCache } from "../../shared/staticcache";
import { SystemInfo } from "../../shared/models/webapi/system/systeminfo";
import { OneHeartUser } from "../../shared/models/webapi/oneheartuser/userdata";
import { DropDownFilterModel } from '../../shared/models/webapi/category/category';
import { EventListItemConst } from '../../shared/pages/eventlistitemtype';
import { StringKeyValue } from '../../shared/models/common/keyvalue';
import { FieldsCategoryName } from '../../shared/models/webapi/category/category';

export function EventListMenuFilterContentReducer(state = initialEventListMenuFilterContentState, action: EventListMenuFilterContentActions): EventListMenuFilterContentState {
  switch (action.type) {
    case EventListMenuFilterContentActionTypes.ViewChangeSucc:
      return Object.assign({}, state, { menuList: action.payload });

    case EventListMenuFilterContentActionTypes.SetDropDownSate:
      let dropdowns = action.payload as DropDownFilterModel;
      let dropdown0 = Object.assign({}, state.DropDownFilter);
      dropdown0.Organizatoins = dropdowns.Organizatoins;
      dropdown0.AssignedTos = dropdowns.AssignedTos;
      dropdown0.Projects = dropdowns.Projects;
      return Object.assign({}, state, { DropDownFilter: dropdown0 }, { menuList: EventListItemConst.GetEventListMenuFor(StaticCache.Config.ListViewId) });
   
    default:
      return state;

  }
}
