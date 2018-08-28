import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const EMOJI_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EmojiPickerComponent),
    multi: true
};

@Component({
    selector: 'emoji-picker',
    providers: [EMOJI_PICKER_VALUE_ACCESSOR],
    templateUrl: './emoji-picker.html'
})
export class EmojiPickerComponent implements ControlValueAccessor {
    emojiArr = [];
    _content: string;
    _onChanged: Function;
    _onTouched: Function;
    constructor() {
        this.emojiArr = this.getEmojis();
    }
    writeValue(obj: any): void { this._content = obj; }
    registerOnChange(fn: any): void { this._onChanged = fn; this.setValue(this._content); }
    registerOnTouched(fn: any): void { this._onTouched = fn; }
    private setValue(val: any): any { this._content += val; if (this._content) { this._onChanged(this._content) } }
    unicodeTostr(str:string){
        return str.replace(/(\\u)(\w{1,4})/gi,x=>{ return (String.fromCharCode(parseInt((encodeURI(x).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));             })
    }
    private getEmojis() {
        const EMOJIS = "😀 😃 😄 😁 😆 😅 😂 🤣 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 🤡 🤠 😏 😒 😞 😔 😟 😕 🙁" +
            " ☹️ 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 🤤 😭 😓 😪 😴 🙄 🤔 🤥 😬 🤐 🤢 🤧 😷 🤒 🤕 😈 👿" +
            " 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚" +
            " 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🤳 💅 🖖 💄 💋 👄 👅 👂 👃 👣 👁 👀 🗣 👤 👥 👶 👦 👧 👨 👩 👱‍♀️ 👱 👴 👵 👲 👳‍♀️ 👳 👮‍♀️ 👮 👷‍♀️ 👷" +
            " 💂‍♀️ 💂 🕵️‍♀️ 🕵️ 👩‍⚕️ 👨‍⚕️ 👩‍🌾 👨‍🌾 👩‍🍳 👨‍🍳 👩‍🎓 👨‍🎓 👩‍🎤 👨‍🎤 👩‍🏫 👨‍🏫 👩‍🏭 👨‍🏭 👩‍💻 👨‍💻 👩‍💼 👨‍💼 👩‍🔧 👨‍🔧 👩‍🔬 👨‍🔬" +
            " 👩‍🎨 👨‍🎨 👩‍🚒 👨‍🚒 👩‍✈️ 👨‍✈️ 👩‍🚀 👨‍🚀 👩‍⚖️ 👨‍⚖️ 🤶 🎅 👸 🤴 👰 🤵 👼 🤰 🙇‍♀️ 🙇 💁 💁‍♂️ 🙅 🙅‍♂️ 🙆 🙆‍♂️ 🙋 🙋‍♂️ 🤦‍♀️ 🤦‍♂️ 🤷‍♀" +
            "️ 🤷‍♂️ 🙎 🙎‍♂️ 🙍 🙍‍♂️ 💇 💇‍♂️ 💆 💆‍♂️ 🕴 💃 🕺 👯 👯‍♂️ 🚶‍♀️ 🚶 🏃‍♀️ 🏃 👫 👭 👬 💑 👩‍❤️‍👩 👨‍❤️‍👨 💏 👩‍❤️‍💋‍👩 👨‍❤️‍💋‍👨 👪 👨‍👩‍👧" +
            " 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👦 👩‍👧" +
            " 👩‍👧‍👦 👩‍👦‍👦 👩‍👧‍👧 👨‍👦 👨‍👧 👨‍👧‍👦 👨‍👦‍👦 👨‍👧‍👧 👚 👕 👖 👔 👗 👙 👘 👠 👡 👢 👞 👟 👒 🎩 🎓 👑 ⛑ 🎒 👝 👛 👜 💼 👓" +
            " 🕶 🌂 ☂️";

        const EmojiArr = EMOJIS.split(' ');
        const groupNum = Math.ceil(EmojiArr.length / (24));
        const items = [];

        for (let i = 0; i < groupNum; i++) {
            items.push(EmojiArr.slice(i * 24, (i + 1) * 24));
        }

        return items
    }
}
// export interface EmojiPickerItem{
//     emoji: string;
//     description: string;
// }
// export class EmojiPickerProvider {
    
//     imojiPickerItemGroups: Array<Array<EmojiPickerItem>>;
  
//     constructor(public http: Http) { }
  
//     getEmojiGroups() {
//       if (this.imojiPickerItemGroups) {
//         return Promise.resolve(this.imojiPickerItemGroups)
//       } else {
//         return new Promise(resolve => {
//           this.http.get('assets/emoji/emoji_02.json')
//             .map(res => res.json())
//             .subscribe((data: Array<EmojiPickerItem>) => {
//               this.imojiPickerItemGroups = new Array<Array<EmojiPickerItem>>();
//               let groupCount = Math.ceil(data.length / (40));
//               for (let i = 0; i < groupCount; i++) {
//                 this.imojiPickerItemGroups.push(data.slice(i * 40, (i + 1) * 40));
//               }
//               resolve(this.imojiPickerItemGroups);
//             });
//         });
//       }
//     }