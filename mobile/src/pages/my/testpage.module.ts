import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { OneHeartApp } from "../../app/app.component";
import {
  MediaService, UserService, OrgsService, ProjectService, RoleService, PriorityService,
  StatusService, FunctionService, FuncFieldsService, IISDBService, CamDBService,
  NotifyService, RelationShipService, HostSettingService, AjaxDBService, AutoDBService
} from "oneheart-core";
import { TestPage } from "./testpage";

@NgModule({
  imports: [IonicModule.forRoot(OneHeartApp)],
  declarations: [TestPage],
  entryComponents: [TestPage],
  providers: [
    MediaService, UserService, OrgsService, ProjectService, RoleService, PriorityService,
    StatusService, FunctionService, FuncFieldsService, IISDBService, CamDBService, NotifyService,
    RelationShipService, HostSettingService, AutoDBService, AjaxDBService],
})
export class TestPageModule { }