import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { counterReducer } from './counter';
import { LoginReducer } from './login';
import { contactorslistReducer, contactorslistfilterReducer } from './contactors/contactorslist.reducer';
import { AboutPageReducer } from './about/about.reducer';
import { CategoryPageReducer } from './category/category.reducer';
import { CategoryEmunReducer } from "./select/categoryemun";
import { DBActionsReducer } from './select/dbactions';
import { ActionFieldsReducer } from './select/actionfields';
import { SearchReducer } from './search/search.reducer';
import { TractorBookMarkPageReducer } from './TractorBookMark/tractorbookmark';
import { EventListPageReducer } from './eventlist/eventlist.reducer';
import { ReceivedListReducer } from "./receivedlist";
import { AccountReducer } from "./account";
import { CalcChartReducer } from "./calcchart";
import { EventDetailReducer } from "./eventdetail";
import { EventCommentReducer } from './eventcomment/eventcomment.reducer';
import { EventListMenuFilterContentReducer } from './eventlistmenufiltercontent/eventlistmenufiltercontent.reducer';
import { EventChildTaskReducer } from './eventchildtask/eventchildtask.reducer';
import { AuthReducer } from "./auth";
import { ToDoListReducer } from './todolist/todolist.reducer';
import { DictionaryReducer } from './dictionary/dictionary.reducer';
import { ExtToDoListReducer } from './exttodolist/exttodolist.reducer';
import { MapReducer } from './mapstate/map.reducer';
import { MenuListsReducer } from './menulist/menulists.reducer';
import { TagsReducer } from './tags/tags.reducer';
import { MediaReducer } from './media/media.reducer';
import { UserReducer } from './user/user.reducer';
import { ORGReducer } from './orgs/org.reducer';
import { ProjectReducer } from './project/project.reducer';
import { RoleReducer } from './role/role.reducer';
import { PriorityReducer } from './priority/priority.reducer';
import { StatusReducer } from './status/status.reducer';
import { SelfDefineFunctionsReducer } from './function/function.reducer';
import { SelfDefineFieldDtoReducer } from './fucfields/fucfields.reducer';
import { IISDBReducer } from './iisdb/iisdb.reducer';
import { CameraSettingDtoReducer } from './camdb/camdb.reducer';
import { NotifyReducer } from './notify/notify.reducer';
import { RelationShipReducer } from './relationship/relationship.reducer';
import { HostSettingReducer } from './hostsetting/hostsetting.reducer';
import { AutoReducer } from './auto/auto.reducer';
import { AjaxReducer } from './ajax/ajax.reducer';

//appstate keys
const myreducers = {
  Ajax: AjaxReducer,
  Auto: AutoReducer,
  HostSetting: HostSettingReducer,
  Relation: RelationShipReducer,
  Notify: NotifyReducer,
  CamDB: CameraSettingDtoReducer,
  IISDB: IISDBReducer,
  FieldDto: SelfDefineFieldDtoReducer,
  SelfFunc: SelfDefineFunctionsReducer,
  Status: StatusReducer,
  Priority: PriorityReducer,
  Role: RoleReducer,
  Project: ProjectReducer,
  Org: ORGReducer,
  User: UserReducer,
  media: MediaReducer,
  counter: counterReducer,
  login: LoginReducer,
  auth: AuthReducer,
  mapList: MapReducer,
  menulist: MenuListsReducer,
  contactors: contactorslistReducer,
  contactorslistfilter: contactorslistfilterReducer,
  About: AboutPageReducer,
  Category: CategoryPageReducer,
  CategoryEmun: CategoryEmunReducer,
  Search: SearchReducer,
  Tags: TagsReducer,
  TractorBookMark: TractorBookMarkPageReducer,
  DBActions: DBActionsReducer,
  ActionFields: ActionFieldsReducer,
  ReceivedList: ReceivedListReducer,
  ToDoList: ToDoListReducer,
  ExtToDoList: ExtToDoListReducer,
  Account: AccountReducer,
  EventList: EventListPageReducer,
  EventListMenuFilterContent: EventListMenuFilterContentReducer,
  CalcChart: CalcChartReducer,
  EventDetail: EventDetailReducer,
  EventComment: EventCommentReducer,
  EventChildTask: EventChildTaskReducer,
  Dictionary: DictionaryReducer
};

const developmentRootReducer = compose(storeFreeze, storeLogger(), combineReducers)(myreducers);
const productionReducer = combineReducers(myreducers);

export function devreducer(state: any, action: any) {
  return developmentRootReducer(state, action);
}
export function prodreducer(state: any, action: any) {
  return productionReducer(state, action);
}