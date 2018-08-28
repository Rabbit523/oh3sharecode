import {Component, Input} from '@angular/core';

@Component({
  selector: 'personpicdatetext',
  templateUrl: 'personpicdatetext.html'
})
export class PersonPicDateTextComponent {
  @Input()
  PersonName: string ;
  @Input()
  PersonPicurl: string ;
  @Input()
  PersonDate: string = "";
  @Input()
  PhoneNo: string ;
  @Input()
  RightText: string ;
}
