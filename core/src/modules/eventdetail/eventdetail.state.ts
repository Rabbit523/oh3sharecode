import { IntKeyValueCheck } from '../../shared/models/webapi/eventdetail/intkeyvalue';
import { CategorySearch } from '../../shared/models/webapi/category/category';
import { EventDetailJson } from '../../shared/models/webapi/eventdetail/eventdetailjson';
import { PostListModel } from '../../shared/models/webapi/eventpost/postlistmodel';
import { KeyIconName } from '../../shared/models/common/keyvalue';
import { EventFieldDisplay } from '../../shared/models/webapi/eventdetail/customdropdowndefine';
import { CustomDropdownDefineModel } from '../../shared/models/webapi/eventdetail/customdropdowndefine';
import { BugUserDtoModel } from '../../shared/models/webapi/mytractor/buguserdtomodel';
import { JsonDictionary } from '../../shared/models/common/jsondictionary';

export class UpdateFixedField {
    StrFieIds: string;
    BgId: number;
    Fid: number;
    DataStr: string;
}
export class EventDetailParas {
    Bgid: number;
    action: number;
}
export class ExcuteAndUpdateCommand extends EventDetailParas {
    btnkey: string;
    stName: string;
    workFlowSt: string;
    updateAssginToUser: boolean;
}
export interface EventDetailState {    
    HeadTitle: string;
    header:string;
    Bgid: number;
    pageFooter: number;
    detailCanEdit: boolean;
    CreatorPicurl: string;
    CreatorPhoneNo: string;
    CreatorOrMajor: boolean;

    menuList: Array<IntKeyValueCheck>;
    detailviewid: number;
    _search: CategorySearch;

    ItemMain: EventDetailJson;
    Post: Array<PostListModel>;
    Commands: Array<KeyIconName>;
    BugUsers: Array<BugUserDtoModel>;
    ExtFieldDisplays: JsonDictionary<EventFieldDisplay>;
    MainFieldDisplays: JsonDictionary<EventFieldDisplay>;
    CustomDropdownDefine: CustomDropdownDefineModel[];
    dataLoaded: boolean;
    postfile:any[];
}

export let initialEventDetailState: EventDetailState = {
    HeadTitle: "",header:"",
    Bgid: 0,
    pageFooter: 0,
    detailCanEdit: false,
    CreatorPicurl: "",
    CreatorPhoneNo: "",
    CreatorOrMajor: false,
    menuList: new Array<IntKeyValueCheck>(),
    detailviewid: 1,
    _search: new CategorySearch(),
    ItemMain: new EventDetailJson(),
    Post: new Array<PostListModel>(),
    Commands: new Array<KeyIconName>(),
    BugUsers: new Array<BugUserDtoModel>(),
    ExtFieldDisplays: new JsonDictionary<EventFieldDisplay>(),
    MainFieldDisplays: new JsonDictionary<EventFieldDisplay>(),
    CustomDropdownDefine: new Array<CustomDropdownDefineModel>(),
    dataLoaded: false,postfile:[]
};

