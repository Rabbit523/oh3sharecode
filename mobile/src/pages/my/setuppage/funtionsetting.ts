import { Component } from '@angular/core';
import { StorageService, JsonDictionary } from 'oneheart-core';
@Component({
    selector: 'funtionsetting',
    templateUrl: 'funtionsetting.html'
})

export class FuntionSetting {
    Setting: JsonDictionary<boolean>;
    constructor(public lss: StorageService) {
        this.Setting = lss._Storage_Setting;
    }

    get Note() {
        return this.Setting.Note;
    }
    set Note(val: boolean) {
        this.Setting.Note = val;
    }

    ionViewCanLeave() {
        this.lss.SetSetting(this.Setting);
        return true;
    }

}