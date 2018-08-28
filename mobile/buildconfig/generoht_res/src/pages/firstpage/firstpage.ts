import { Component, ViewChild } from '@angular/core';
import { Events, InfiniteScroll, ModalController, NavController, SegmentButton, Slides } from 'ionic-angular';
import { FirstPageBase } from './firstpagebase';
import { Store } from '@ngrx/store';
import * as coreHeart from 'oneheart-core';
import { SearchPage } from './search/search';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';

@Component({
    selector: 'firstpage',
    templateUrl: 'firstpage.html'
})

export class FirstPage extends FirstPageBase {

    @ViewChild('loopSlider') sliderComponent: Slides;
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public events: Events
        , public detailservice: coreHeart.EventDetailService
        , public listservice: coreHeart.BugsListService
        , public store$: Store<coreHeart.AppState>
    ) {
        super(navCtrl, modalCtrl, events, detailservice, store$);
        this.SubscribeCompany = () => { this.RefreshSlidesItems() };
        this.InitFirstPageList();
        this.initXygdd();
    }

    state: coreHeart.ExtToDoListState;
    initXygdd() {
        this.store$.select(s => s.ExtToDoList).subscribe(state => {
            this.state = JSON.parse(JSON.stringify(state));
            this.slides.Items.forEach((el, index) => {
                if (el.problemtype == ApplicationFirstBasePage.ProblemPageType.extWaitprocess) {
                    this.slides.Items[index].LoadPage++;
                    if (this.slides.Items[index].items.length == 0) {
                        this.state.Items.forEach(it => { this.slides.Items[index].items.push(it); })
                    } else {
                        this.slides.Items[index].items = this.state.Items;
                    }
                }
            })
        });
    }


    slides = {
        selectedSegment: "first",
        acttype: ApplicationFirstBasePage.ProblemPageType.extWaitprocess,
        Items: [
            //{ id: 'first', Name: "待下发的问题", items: [], problemtype: ApplicationFirstBasePage.ProblemPageType.DispatchingProblem, LoadPage: 1 },
            //{ id: 'second', Name: "待整改的问题", items: [], problemtype: ApplicationFirstBasePage.ProblemPageType.FixingProblem, LoadPage: 1 },
            //{ id: 'third', Name: "待销号的问题", items: [], problemtype: ApplicationFirstBasePage.ProblemPageType.ClosingProblem, LoadPage: 1 }
            { id: 'first', Name: "待处理的问题", items: [], problemtype: ApplicationFirstBasePage.ProblemPageType.extWaitprocess, LoadPage: 1 }
        ]
    };

    onSegmentChanged(segment: SegmentButton) {
        const selectedIndex = this.slides.Items.findIndex((slide) => { return slide.id === segment.value; });
        if (this.slides.Items[selectedIndex]) {
            this.slides.acttype = this.slides.Items[selectedIndex].problemtype
            this.sliderComponent.slideTo(selectedIndex, 1000);
        }
    }
    onSlideChanged(slide: Slides) {
        const currentSlide = this.slides.Items[slide.getActiveIndex()];
        if (currentSlide) {
            this.slides.selectedSegment = currentSlide.id;
            this.slides.acttype = currentSlide.problemtype
        }
    }

    doInfinite(infiniteScroll: InfiniteScroll) {
        infiniteScroll.enable(false);
        setTimeout(() => { try { infiniteScroll.enable(true); } catch (e) { } }, 5000);
        infiniteScroll.waitFor(this.LoadMoreData(infiniteScroll, this.slides.acttype))
    }

    private RefreshSlidesItems() {
        this.slides.Items.forEach((element, i) => { this.slides.Items[i].LoadPage = 1; this.LoadMoreData(null, element.problemtype); });
    }

    private LoadMoreData(infiniteScroll: any, problemtype: number): Promise<any> {
        return new Promise((resolve, reject) => {
            var LoadPage = 1;
            this.slides.Items.forEach(el => { if (el.problemtype === problemtype) { LoadPage = el.LoadPage; } })
            var paraJSON: any = ApplicationFirstBasePage.GetProblemPageParas(problemtype, 1, "xxxx", coreHeart.StaticCache.Config.username);
            if (problemtype != ApplicationFirstBasePage.ProblemPageType.extWaitprocess) {
                paraJSON[coreHeart.EventListParaHelper.ListParas.Page] = LoadPage;
                this.listservice.GetEventlistObservable(paraJSON).subscribe(
                    response => {
                        let items = response as coreHeart.EventListJson;
                        if (items.Items.length > 0) { this._refreshListAndPage(items, problemtype); }
                        this.events.publish(coreHeart.EventConst.System_Resetwaiting);
                        resolve();
                    }, err => {
                        this.listservice.handleError("eventListCacheService_refreshData", err); resolve();
                    }
                );
            } else {
                if (LoadPage == 1) {
                    let intstate = Object.assign({}, coreHeart.initialExtToDoListState, { label: coreHeart.DBProblem.ResponsiblePerson, fid: 4, pageTitle: "", st: paraJSON[coreHeart.EventListParaHelper.ListParas.Statu] });
                    this.store$.dispatch(new coreHeart.ExtToDoListShowAction(intstate));
                }
                else {
                    this.store$.dispatch(new coreHeart.ExtToDoListPageDownAction(this.state));
                }

            }
        })
    }
    private _refreshListAndPage(item: coreHeart.EventListJson, problemtype: number) {
        this.slides.Items.forEach((element, index) => {
            if (element.problemtype === problemtype) {
                this.slides.Items[index].LoadPage++;
                if (this.slides.Items[index].items.length == 0) {
                    item.Items.forEach(it => { this.slides.Items[index].items.push(it); })
                } else {
                    this.slides.Items[index].items = item.Items;
                }
            }
        });
    }
    search() {
        this.navCtrl.push(SearchPage);
    }


    SetfirstPageList(): coreHeart.ActionPageListGroup[] {
        return [
            new coreHeart.ActionPageListGroup("0", [ApplicationFirstBasePage.newproblem, ApplicationFirstBasePage.myreport, ApplicationFirstBasePage.calcall]),
            new coreHeart.ActionPageListGroup("1", [ApplicationFirstBasePage.extwaitprocess])
        ];
    }
}