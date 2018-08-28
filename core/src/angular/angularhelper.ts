import { NgModule, ModuleWithProviders } from '@angular/core';
import {IDNamePipe, BaseUrlPipe, GetTaskUserDataFormatPipe, ParenthesesPipe, FormatStrPipe, LastCharPipe, ReplaceComaPipe, ReplaceHtmlPipe, SanitizeHtml, TrimStrPipe, FormatTaskListPipe, ToUserPicPipe, ToWeekDayPipe, ToSaftStrPipe } from './filter';


@NgModule({
  declarations: [
    ToWeekDayPipe,
    GetTaskUserDataFormatPipe, ReplaceComaPipe, TrimStrPipe, SanitizeHtml, LastCharPipe, ReplaceHtmlPipe, BaseUrlPipe
    , FormatStrPipe, FormatTaskListPipe, ParenthesesPipe, ToUserPicPipe,IDNamePipe,ToSaftStrPipe
  ],
  exports: [
    ToWeekDayPipe,
    GetTaskUserDataFormatPipe, ReplaceComaPipe, TrimStrPipe, SanitizeHtml, LastCharPipe, ReplaceHtmlPipe, BaseUrlPipe
    , FormatStrPipe, FormatTaskListPipe, ParenthesesPipe, ToUserPicPipe,IDNamePipe,ToSaftStrPipe
  ],
  providers: []
})
export class AngularHelperModel {}