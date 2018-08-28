import { IntKeyValue } from '../../common/keyvalue';

export class IntKeyValueCheck extends IntKeyValue {
    checked: boolean = false;
    constructor(vkey: number, vvalue: any, vchecked?: boolean) {
        super(vkey, vvalue);
        if (vchecked) {
            this.checked = vchecked;
        }
    }
}

export class StringItemsModel {
    Items: string[];
}
export class StringDictionaryMap {
    [string: string]: string;
}
export class IntDictionarySelectListItemModelMap { }