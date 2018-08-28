import { Component, Input } from '@angular/core';

@Component({
    selector: 'singlevideoplayer',
    templateUrl: './singlevideoplayer.html'
})
export class SingleVideoPlayer {
    @Input()
    src: string = "";// 文件名
    @Input()
    type: string = "";// 文件类型
}
