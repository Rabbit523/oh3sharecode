import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ContactorComponent } from './contactorcomponent';
import { IonItemDateTimeComponent } from './ionitemdatetime.component';
import { CommonCompModule } from "../common/commoncomp.module";


//组件注册从app.module.ts中分离，为其他的页面引入共享组件做准备
@NgModule({
  imports: [
    IonicModule, CommonCompModule
  ],
  declarations: [
    ContactorComponent, IonItemDateTimeComponent
  ],
  exports: [
    ContactorComponent, IonItemDateTimeComponent
  ],
  providers: []
})
export class ComponentModule {
}
