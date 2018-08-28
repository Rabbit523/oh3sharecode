import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { LaddaModule } from 'angular2-ladda';

import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { EventComponentModule } from '../../components/event/event.component.module';
import { CompositeChart } from './receivedcomment/compositechart';
import { FirstPageItem } from '../../components/menu/page/firstpageitem';
import { FirstPageToolbar } from '../../components/menu/page/firstpagetoolbar';
import { ReceivedList } from './receivedcomment/receivedlist';
import { FirstPage } from './firstpage';
import { ToDoList } from './receivedcomment/todolist';
import { TranslateModule } from '@ngx-translate/core';
import { ToDoComponent } from './receivedcomment/todo.component';
import { SearchPage } from './search/search';
import { SearchList } from './search/searchlist';
import { CalcGridStatusComponents } from './calc/calcgrid';

@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, EventComponentModule, coreHeart.AngularHelperModel, TranslateModule,LaddaModule
  ],
  declarations: [
    FirstPage, SearchList
    , ReceivedList, FirstPageItem, CompositeChart, ToDoList, ToDoComponent, SearchPage, FirstPageToolbar
    , CalcGridStatusComponents
  ],
  entryComponents: [
    FirstPage, SearchList
    , ReceivedList, FirstPageItem, CompositeChart, ToDoList, SearchPage, FirstPageToolbar
    , CalcGridStatusComponents
  ],
  providers: [
    coreHeart.SearchService,
    coreHeart.EventDetailService, coreHeart.BugsListService, coreHeart.EventPostService
  ],
})
export class FirstPageModule { }