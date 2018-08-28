import { Utils } from "oneheart-core";

export class IonicNavBasePage {    
    ionViewCanEnter() { Utils.log("ionViewCanEnter_1"); }
    ionViewDidLoad() { Utils.log("ionViewDidLoad_2"); }    
    ionViewWillEnter() { Utils.log("ionViewWillEnter_3"); }    
    ionViewDidEnter() { Utils.log("ionViewDidEnter_4"); }    
    ionViewCanLeave() { Utils.log("ionViewCanLeave_5"); }
    ionViewWillLeave() { Utils.log("ionViewWillLeave_6"); }    
    ionViewDidLeave() { Utils.log("ionViewDidLeave_7"); }
    ionViewWillUnload() { Utils.log("ionViewWillUnload_8"); }
}