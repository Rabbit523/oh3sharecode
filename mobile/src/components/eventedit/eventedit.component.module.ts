import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AngularHelperModel } from "oneheart-core";
import { DepartmentEmployeeService } from 'oneheart-core';

import { ComponentModule } from '../component/component.module';
import { EventEditItem } from './eventedititem.component';
import { EventEditProblem } from './eventeditproblem.component';
import { EventTaskEditItem } from './eventtaskedititem.component';
import { EventTimeTask } from './eventtimetask.component';

//组件注册从app.module.ts中分离，为其他的页面引入共享组件做准备
@NgModule({
  imports: [IonicModule, AngularHelperModel,ComponentModule],
  declarations: [EventEditItem, EventTaskEditItem, EventTimeTask, EventEditProblem],
  exports: [EventEditItem, EventTaskEditItem, EventTimeTask, EventEditProblem],
  providers: [DepartmentEmployeeService],  
})
export class EventeditComponentModule { }