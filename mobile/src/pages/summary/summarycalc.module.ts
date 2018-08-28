import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SummaryCalc } from './summarycalc';
import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { ComponentModule } from '../../components/component/component.module';
import { SummaryCalcComponent } from './comonents/summarycalc.component';


@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, ComponentModule
  ],
  declarations: [
    SummaryCalc, SummaryCalcComponent
  ],
  entryComponents: [
    SummaryCalc, SummaryCalcComponent
  ],
  providers: [],
})
export class SummaryCalcModule {
}
