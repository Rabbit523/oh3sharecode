//import { Webapi } from 'oneheart-core';
import { ContactorCacheHelper } from 'oneheart-core';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'personitemavatar',
    templateUrl: 'personitemavatar.html'
})
export class PersonItemAvatar implements OnChanges {
    ngOnChanges(): void {
        if (this.useid)
            try {
                let item = ContactorCacheHelper.GetContactorById(this.useid);
                if (item) {
                    this.PersonLastName = item.us_firstname || item.us_username;
                    this.PersonPicurl = item.UserPic;
                }
            }
            catch (e) {

            }
    }    

    @Input() small: boolean = false;
    @Input() pcontent: string = "";
    @Input() useid: number;

    PersonLastName: string = "";
    PersonPicurl: string = "";
}