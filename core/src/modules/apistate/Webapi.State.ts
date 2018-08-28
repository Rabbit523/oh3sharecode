import { PersonalizationJson } from "../../shared/models/webapi/oneheartuser/userdata";

export class WebapiState {
    UserId: number;
    baseurl: string;
    username: string;
    password: string;
    ListViewId: number;
    ListActionType: number;
    DetailViewId: number;
    platformIsIos: boolean;
    platformIsAndroid: boolean;
    platformIsMobileWeb: boolean;
    interfacecode: string;
    appVersion: string;
    systemtitle: string;
    PersonalizationJson: PersonalizationJson;
    constructor() {
        this.UserId = -1;
        this.baseurl = "";
        this.username = "";
        this.password = "";
        this.ListViewId = -1;
        this.ListActionType = 4;
        this.DetailViewId = 1;
        this.platformIsIos = false;
        this.platformIsAndroid = false;
        this.platformIsMobileWeb = true;
        this.interfacecode = "";
        this.appVersion = "";
        this.systemtitle = "";
        this.PersonalizationJson = new PersonalizationJson();
    }
}
