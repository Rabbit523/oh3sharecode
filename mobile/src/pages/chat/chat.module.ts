import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat } from './chat';
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";
import { SignalRService } from './signalrservice';

export const signalRService = new SignalRService();

@NgModule({
  declarations: [Chat],
  imports: [EmojiPickerComponentModule, IonicPageModule.forChild(Chat)],
  exports: [Chat],
  providers: [{ provide: SignalRService, useValue: signalRService }]
})
export class ChatModule { }
