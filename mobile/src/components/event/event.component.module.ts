import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AngularHelperModel } from 'oneheart-core';
import { CommonCompModule } from '../common/commoncomp.module';
import { EventListItem } from './eventlistitem.component';
import { EventListItemProblem } from './eventlistitem.problem';
import { EventListItemSimpGraph } from './eventlistitem.simpgraph';
import { EventListItemSimpText } from './eventlistitem.simptext';
import { EventListItemTask } from './eventlistitem.task';
import { EventListItemRules } from './eventlistitem.rules';

//组件注册从app.module.ts中分离，为其他的页面引入共享组件做准备
@NgModule({
  imports: [
    IonicModule, CommonCompModule, AngularHelperModel
  ],
  declarations: [EventListItem, EventListItemSimpGraph, EventListItemRules
    , EventListItemSimpText, EventListItemProblem, EventListItemTask],
  exports: [EventListItem, EventListItemSimpGraph, EventListItemRules
    , EventListItemSimpText, EventListItemProblem, EventListItemTask],
  providers: []
})
export class EventComponentModule { }