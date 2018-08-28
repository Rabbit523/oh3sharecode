import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';

import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { EventComponentModule } from '../../components/event/event.component.module';
import { AngularHelperModel } from "oneheart-core";
import { CalcChart } from './chartcalc/calcchart';
import { ChartFilter } from './chartcalc/chartfilter';
import { EventListPage } from './event-list';
import { EventListMyCreatePage } from './event-listmycreate';
import { EventListMenuFilterContent } from './eventlistmenufiltercontent';


@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, EventComponentModule, AngularHelperModel
  ],
  declarations: [
    EventListPage, EventListMyCreatePage,
    EventListMenuFilterContent,
    CalcChart, ChartFilter
  ],
  entryComponents: [
    EventListPage, EventListMyCreatePage,
    EventListMenuFilterContent,
    CalcChart, ChartFilter
  ],
  providers: [
    coreHeart.BugsListService, coreHeart.EventDetailService
    , coreHeart.DepartmentEmployeeService, coreHeart.SelectItemService],

})
export class EventListModule {}
