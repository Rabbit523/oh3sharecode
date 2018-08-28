import { NgModule } from '@angular/core';
import { File } from '@ionic-native/file';
import { IonicModule } from 'ionic-angular';
import { MapService } from 'oneheart-core';

import { OneHeartApp } from '../../app/app.component';
import { AudioRecorder } from 'oneheart-core';
import { CameraModule } from '../../components/camera/camera.module';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { ComponentModule } from '../../components/component/component.module';
import { EventeditComponentModule } from '../../components/eventedit/eventedit.component.module';
import { AngularHelperModel } from "oneheart-core";
import { EventComment } from './event-comment';
import { EventCreateProblemPage } from './event-createproblem';
import { EventEditPage } from './event-edit';
import { EventEditProblemPage } from './event-editproblem';
import { EventEditTaskPage } from './eventedittask';
import { EventReportProblemPage } from './event-reportproblem';
import { EventChildTask } from './eventchildtask';
import { ProblemComplate } from './problemcomplate';
import { NavListSelector } from '../../components/tree/navlistselector';
import { TreeListSelector } from '../../components/tree/treelistselector';

@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, CameraModule, EventeditComponentModule, ComponentModule, AngularHelperModel
  ],
  declarations: [
    EventComment, ProblemComplate
    , EventCreateProblemPage, EventEditProblemPage, EventReportProblemPage    
    , EventEditPage
    , EventEditTaskPage
    , EventChildTask
    , NavListSelector,TreeListSelector
  ],
  entryComponents: [
    EventComment, ProblemComplate
    , EventCreateProblemPage, EventEditProblemPage, EventReportProblemPage
    , EventEditPage
    , EventEditTaskPage
    , EventChildTask
    , NavListSelector,TreeListSelector
  ],
  providers: [AudioRecorder, MapService, File]
})
export class EventEditModule { }