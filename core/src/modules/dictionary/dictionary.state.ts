import { StatusDto } from '../../shared/models/webapi/status/status';
import { IntKeyValue } from '../../shared/models/common/keyvalue';
import { FieldsCategoryName } from '../../shared/models/webapi/category/category';

export interface DictionaryState {
    status:StatusDto[];
    extdic: Array<FieldsCategoryName>;    
}

export let initialDictionaryState: DictionaryState = {
    status:new Array<StatusDto>(),
    extdic:new Array<FieldsCategoryName>(),    
};