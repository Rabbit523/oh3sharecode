import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EmojiPickerComponent } from './emoji-picker';

@NgModule({
    imports: [IonicModule],
    declarations: [
        EmojiPickerComponent,
    ],
    exports: [
        EmojiPickerComponent
    ]
})
export class EmojiPickerComponentModule {
}
