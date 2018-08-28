import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AngularHelperModel } from "oneheart-core";

import { CameraModule } from '../camera/camera.module';
import { CommonCompModule } from '../common/commoncomp.module';
import { EventdetailCommandsComponent } from './command/eventdetailcommands.component';
import { EventdetailCommandsToolbarView } from './command/eventdetailcommandstoolbar.component';
import { EventDetailCreator } from './command/eventdetailcreator.component';
import { EventDetailItem } from './maindetail/eventdetailitem.component';
import { EventDetailItemOfficeNote } from './maindetail/eventdetailitem_officenote.component';
import { EventDetailItemProblem } from './maindetail/eventdetailitem_problem.component';
import { EventDetailItemTask } from './maindetail/eventdetailitem_task.component';
import { EventpostsChatviewComponent } from './postdetail/eventpostschatview.component';
import { EventPostsContentView } from './postdetail/eventpostscontentview.component';
import { EventPostsFormview } from './postdetail/eventpostsformview.component';
import { EventPostsTableview } from './postdetail/eventpoststableview.component';
import { EventpostsTimeviewComponent } from './postdetail/eventpoststimeview.component';
import { EventDetailItemRelationShipView } from './maindetail/eventdetailitemrelationshipview';
import { EventpostsProblemviewComponent } from './postdetail/eventpostsproblemview.component';
import { EventTags } from './maindetail/eventtags';

//组件注册从app.module.ts中分离，为其他的页面引入共享组件做准备
@NgModule({
  imports: [
    IonicModule, CommonCompModule, CameraModule, AngularHelperModel
  ],
  declarations: [
    EventDetailCreator
    , EventDetailItem //00
    , EventDetailItemProblem, EventDetailItemTask, EventDetailItemOfficeNote ,EventDetailItemRelationShipView   //01
    , EventpostsTimeviewComponent, EventpostsChatviewComponent, EventPostsContentView, EventPostsTableview, EventPostsFormview,EventpostsProblemviewComponent    //11
    , EventdetailCommandsComponent, EventdetailCommandsToolbarView
    ,EventTags
  ],
  exports: [
    EventDetailCreator
    , EventDetailItem  //00
    , EventDetailItemProblem, EventDetailItemTask, EventDetailItemOfficeNote  ,EventDetailItemRelationShipView   //01
    , EventpostsTimeviewComponent, EventpostsChatviewComponent, EventPostsContentView, EventPostsTableview, EventPostsFormview,EventpostsProblemviewComponent    //11
    , EventdetailCommandsComponent, EventdetailCommandsToolbarView
    ,EventTags
  ],

  providers: []
})
export class EventdetailComponentModule {
}
