import { CounterState } from './counter';
import { LoginState } from './login';
import { ContactorslistState } from './contactors/contactorslist.state';
import { AboutPageState } from './about/about.state';
import { CategoryPageState } from './category/category.state';
import { CategoryEmunState } from "./select/categoryemun";
import { DBActionsState } from './select/dbactions';
import { ActionFieldsState } from './select/actionfields';
import { SearchState } from './search/search.state';
import { TractorBookMarkPageState } from './TractorBookMark/tractorbookmark';
import { EventListPageState } from './eventlist/eventlist.state';
import { ReceivedListState } from './receivedlist';
import { AccountState } from "./account";
import { CalcChartState } from "./calcchart";
import { EventDetailState } from "./eventdetail";
import { EventCommentState } from './eventcomment/eventcomment.state';
import { EventListMenuFilterContentState } from './eventlistmenufiltercontent/eventlistmenufiltercontent.state';
import { EventChildTaskState } from './eventchildtask/eventchildtask.state';
import { AuthState } from "./auth";
import { ToDoListState } from './todolist/todolist.state';
import { DictionaryState } from './dictionary/dictionary.state';
import { ExtToDoListState } from './exttodolist/exttodolist.state';
import { MapState } from './mapstate/map.state';
import { MenuListsState } from './menulist/menulists.state';
import { TagsState } from './tags/tags.state';
import { MediaState } from './media/media.state';
import { UserState } from './user';
import { ORGState } from './orgs';
import { ProjectState } from './project';
import { RoleState } from './role/role.state';
import { PriorityState } from './priority/priority.state';
import { StatusState } from './status/status.state';
import { SelfDefineFunctionsState } from './function/function.state';
import { SelfDefineFieldDtoState } from './fucfields/fucfields.state';
import { IISDBState } from './iisdb/iisdb.state';
import { CameraSettingDtoState } from './camdb/camdb.state';
import { NotifyState } from './notify/notify.state';
import { RelationShipState } from './relationship/relationship.state';
import { HostSettingState } from './hostsetting/hostsetting.state';
import { AutoState } from './auto/auto.state';
import { AjaxState } from './ajax/ajax.state';

export interface AppState {
  Ajax: AjaxState,
  Auto: AutoState,
  HostSetting: HostSettingState,
  Relation: RelationShipState,
  Notify: NotifyState,
  CamDB: CameraSettingDtoState,
  IISDB: IISDBState,
  FieldDto: SelfDefineFieldDtoState,
  SelfFunc: SelfDefineFunctionsState,
  Status: StatusState,
  Priority: PriorityState,
  Role: RoleState,
  Project: ProjectState,
  Org: ORGState,
  User: UserState,
  media: MediaState,
  counter: CounterState,
  login: LoginState,
  auth: AuthState,
  mapList: MapState,
  menulist: MenuListsState,
  contactors: ContactorslistState,
  About: AboutPageState,
  Category: CategoryPageState,
  CategoryEmun: CategoryEmunState,
  DBActions: DBActionsState,
  ActionFields: ActionFieldsState,
  Search: SearchState,
  Tags: TagsState,
  TractorBookMark: TractorBookMarkPageState,
  ReceivedList: ReceivedListState,
  ToDoList: ToDoListState,
  ExtToDoList: ExtToDoListState,
  EventList: EventListPageState,
  EventListMenuFilterContent: EventListMenuFilterContentState,
  Account: AccountState,
  CalcChart: CalcChartState,
  EventDetail: EventDetailState,
  EventComment: EventCommentState,
  EventChildTask: EventChildTaskState,
  Dictionary: DictionaryState,
  contactorslistfilter,

}