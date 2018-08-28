import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ContactorService, TractorBookmarkService, ChcpversionService, SelectItemService, CategoryService, TagsService } from 'oneheart-core';

import { OneHeartApp } from '../../app/app.component';
import { CommonCompModule } from '../../components/common/commoncomp.module';
import { ComponentModule } from '../../components/component/component.module';
import { AboutPage } from './about/about';
import { AccountPage } from './account/account';
import { CategoryListComponent } from './categroy/categorylist.component';
import { FieldCategories } from './categroy/fieldcategories';
import { FieldCategory } from './categroy/fieldcategory';
import { MyPage } from './my';
import { MyBookmarkListPage } from './mybookmark-list/mybookmark-list';
import { MyTractorListPage } from './mytractor-list/mytractor-list';
import { MySetupPage } from './setuppage/setuppage';
import { AccountComponentPage } from './account/account.component';
import { UsertagsPage } from './tags/usertags';
import { DicTagsPage } from './tags/dictags';
import { UserTagsListPage } from './tags/usertagslist';
import { DicTagsListPage } from './tags/dictagslist';
import { TagsListComponent } from './tags/tagslist.component';
import { SetupBtnList } from './setuppage/setupbtnlist';
import { FuntionSetting } from './setuppage/funtionsetting';
import { ScanPage } from './scan/scan';


@NgModule({
  imports: [
    IonicModule.forRoot(OneHeartApp), CommonCompModule, ComponentModule
  ],
  declarations: [
    MyPage, AboutPage, AccountPage, AccountComponentPage, MyBookmarkListPage, MyTractorListPage, SetupBtnList, MySetupPage,
    FieldCategories, FieldCategory, DicTagsPage, UsertagsPage, DicTagsListPage, UserTagsListPage, FuntionSetting
    , ScanPage
    , TagsListComponent, CategoryListComponent],
  entryComponents: [
    MyPage, AboutPage, AccountPage, AccountComponentPage, MyBookmarkListPage, MyTractorListPage, SetupBtnList, MySetupPage,
    FieldCategories, FieldCategory, DicTagsPage, UsertagsPage, DicTagsListPage, UserTagsListPage, FuntionSetting
    , ScanPage
    , TagsListComponent, CategoryListComponent],
  providers: [
    ChcpversionService, ContactorService
    , TractorBookmarkService
    , CategoryService, SelectItemService, TagsService],
})
export class MyPageModule {
}
