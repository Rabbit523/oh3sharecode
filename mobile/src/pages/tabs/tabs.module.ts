import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { EventDetailService ,AngularHelperModel} from 'oneheart-core';
import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { TabsPage } from './tabspage';

@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule,   AngularHelperModel,TranslateModule
  ],
  declarations: [TabsPage],
  entryComponents: [TabsPage],
  providers: [EventDetailService]
})
export class TabsModule { }