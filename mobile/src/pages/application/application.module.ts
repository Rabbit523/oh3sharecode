import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { AngularHelperModel } from "oneheart-core";
import { ApplicationPage } from './applicationpage';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListStyle } from '../../components/menu/tableorlist/liststyle';
import { TableStyle } from '../../components/menu/tableorlist/tablestyle';

@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, AngularHelperModel
  ],
  declarations: [
    ApplicationPage, ListStyle, TableStyle],
  entryComponents: [
    ApplicationPage, ListStyle, TableStyle],
  providers: [],
})
export class ApplicationModule { }