import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { AngularHelperModel } from 'oneheart-core';
import { CreatorPicComponent } from './creatorpiccomponent';
import { ImgCard } from './imgcard';
import { NameDatePhoneComponent } from './namedatephonecomponent';
import { PaginationPage } from './pagination';
import { PersonItemAvatar } from './personitemavatar';
import { PersonPicDateTextComponent } from './personpicdatetext';
import { PersonPicOrNameComponent } from './personpicorname';
import { PopoverPage } from './popover';
import { InLineMessage } from './inlinemessage';


//组件注册从app.module.ts中分离，为其他的页面引入共享组件做准备
@NgModule({
  imports: [IonicModule, BrowserModule, AngularHelperModel],
  declarations: [
    PaginationPage, NameDatePhoneComponent, CreatorPicComponent
    , ImgCard, PersonPicOrNameComponent, PersonPicDateTextComponent
    , PersonItemAvatar, PopoverPage,InLineMessage
  ],
  exports: [
    PaginationPage, NameDatePhoneComponent, CreatorPicComponent
    , ImgCard, PersonPicOrNameComponent, PersonPicDateTextComponent
    , PersonItemAvatar, PopoverPage,InLineMessage
  ],  
  entryComponents: [   
    PopoverPage
  ],
 
})
export class CommonCompModule { }