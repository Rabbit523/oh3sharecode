import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CategoryService, EventDetailService, EventPostService } from 'oneheart-core';

import { OneHeartApp } from '../../app/app.component';
import { CameraModule } from '../../components/camera/camera.module';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { EventdetailComponentModule } from '../../components/eventdetail/eventdetail.component.module';
import { EventeditComponentModule } from '../../components/eventedit/eventedit.component.module';
import { AngularHelperModel } from "oneheart-core";
import { EventDetailPage } from './event-detail';
import { MyPopOverPage } from './mypopoverpage';

@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, CameraModule, EventeditComponentModule, EventdetailComponentModule, AngularHelperModel
  ],
  declarations: [EventDetailPage, MyPopOverPage],
  entryComponents: [EventDetailPage, MyPopOverPage],
  providers: [CategoryService, EventDetailService, EventPostService],
})
export class EventDetailModule {

}
