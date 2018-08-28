import { SelfDefineFieldDtoJSON, SelfDefineFieldDto } from "../../shared/models/webapi/funcfields/fieldsdto";
import { SelectListItemModel } from '../../shared/models/webapi/eventdetail/dropdownjson';

export interface SelfDefineFieldDtoState { List: SelfDefineFieldDtoJSON, SelfDefineFieldDto: SelfDefineFieldDto, Dic: JSON ,SelectList:SelectListItemModel[]}
export let initialSelfDefineFieldDtoState: SelfDefineFieldDtoState = { List: new SelfDefineFieldDtoJSON(), SelfDefineFieldDto: new SelfDefineFieldDto(), Dic: <JSON>{},SelectList:[] };
