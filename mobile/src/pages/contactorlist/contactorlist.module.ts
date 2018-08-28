import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ContactorService} from 'oneheart-core';

import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { ComponentModule } from '../../components/component/component.module';
import { AngularHelperModel } from "oneheart-core";
import { ContactorDetailPage } from './contactor-detail';
import { ContactorListPage } from './contactorlist';
import { ContactorPageList } from './contactorlist.component';

@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, ComponentModule, AngularHelperModel, Ionic2RatingModule
  ],
  declarations: [ContactorListPage, ContactorDetailPage,ContactorPageList],
  entryComponents: [ContactorListPage, ContactorDetailPage,ContactorPageList],
  providers: [ ContactorService],
})
export class ContactorListModule {
}

