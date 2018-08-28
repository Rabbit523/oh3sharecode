import { EventFieldDisplay, JsonDictionary } from "oneheart-core";

export class FieldDisplayBase {
    _MainDisplayDictionary = new JsonDictionary<EventFieldDisplay>();
    _ExtDisplayDictionary = new JsonDictionary<EventFieldDisplay>();
    getMDisplayField(key: string) {
        let val = new EventFieldDisplay("", "", "", "");;
        if (this._MainDisplayDictionary[key])
            val = this._MainDisplayDictionary[key];
        return val
    }
    getEDisplayField(key: string) {
        let val = new EventFieldDisplay("", "", "", "");;
        if (this._ExtDisplayDictionary[key])
            val = this._ExtDisplayDictionary[key];
        return val
    }

}