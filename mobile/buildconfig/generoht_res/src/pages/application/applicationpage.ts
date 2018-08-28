import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { AppState, BugsListService, ActionPageListGroup,  IntKeyValue, MenuListsChangeAction, StaticCache } from 'oneheart-core';
import { ApplicationBase } from './applicationbase';
import { Store } from '@ngrx/store';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';

@Component({
    selector: 'applicationpage',
    templateUrl: 'applicationpage.html'
})
export class ApplicationPage extends ApplicationBase {

    constructor(public navCtrl: NavController, public eventListSer: BugsListService,
        public events: Events, public store$: Store<AppState>) {
        super(navCtrl, events, eventListSer, store$);
    }
    SetApplicationPageList(): ActionPageListGroup[] {
        return [
            new ActionPageListGroup("个人", [ApplicationFirstBasePage.myreport]),
            new ActionPageListGroup("团队", [ApplicationFirstBasePage.dispatch, ApplicationFirstBasePage.fixing, ApplicationFirstBasePage.closeing, ApplicationFirstBasePage.calcall, ApplicationFirstBasePage.allproblem]),
            new ActionPageListGroup("制度", [ApplicationFirstBasePage.safetyrules, ApplicationFirstBasePage.inspectionrules])
        ];
    }

    SubscribeCompany() {
        let CountKV: Array<IntKeyValue> = [
            { key: ApplicationFirstBasePage.ProblemPageType.FixingProblem, value: "fixing" },
            { key: ApplicationFirstBasePage.ProblemPageType.MyReportProblem, value: "myreport" },
            { key: ApplicationFirstBasePage.ProblemPageType.DispatchingProblem, value: "dispatch" },
            { key: ApplicationFirstBasePage.ProblemPageType.ClosingProblem, value: "closeing" }
        ];
        let strDicAry = [];
        CountKV.forEach(element => {
            var json: any = ApplicationFirstBasePage.GetProblemPageParas(element.key, 1, "", StaticCache.Config.username);
            strDicAry.push({ key: element.value, value: json });
        });
        this.store$.dispatch(new MenuListsChangeAction(strDicAry));
    }
}