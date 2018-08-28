import { Component, Input } from '@angular/core';

@Component({
    selector: 'singleaudioplayer',
    templateUrl: './singleaudioplayer.html'
})
export class SingleAudioPlayer {
    @Input()
    src: string = "";// 文件名
    @Input()
    type: string = "";// 文件类型
}