import { Component} from '@angular/core';
import { ViewController } from 'ionic-angular'; 

@Component({
    selector: 'PopoverPage',
    template: `
    <ion-list no-margin>     
      <button ion-item (click)="close()">收藏</button>
    </ion-list>
  `    
})
export class PopoverPage {
    constructor(public viewCtrl: ViewController) {
    }  
    close() {
        this.viewCtrl.dismiss();
    }
}
