export class KeyIconName {
    index: any;
    Name: string;
    Icon: string;
    constructor(vindex: any, vName: string, vIcon: string) {
        this.index = vindex;
        this.Name = vName;
        this.Icon = vIcon;
    }
}

export class IntKeyValue {
    key: number;
    value: any;
    constructor(vkey: number, vvalue: any) {
        this.key = vkey;
        this.value = vvalue;
    }
}
export class StringKeyValue {
    key: string;
    value: any;
    constructor(vkey: string, vvalue: any) {
        this.key = vkey;
        this.value = vvalue;
    }
}
export class KeyValuePair<TKey, TValue>{
    Key: TKey;
    Value: TValue;
}