import { NgModule } from '@angular/core';
import { IonicModule, Events } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { LoginPage } from '../login/login';

@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule
  ],
  declarations: [LoginPage],
  entryComponents: [LoginPage],
  providers: [
    Events
    , coreHeart.ContactorService
    , coreHeart.AuthService, coreHeart.BugsListService, coreHeart.TagsService
    , coreHeart.StorageService, coreHeart.DepartmentEmployeeService
  ],
})
export class LoginPageModule {
}