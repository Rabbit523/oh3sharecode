import { Component, Input } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@Component({
    selector: 'imgcard',
    templateUrl: 'imgcard.html'
})
export class ImgCard {
    constructor(public photoViewer: PhotoViewer) {
    }
    @Input() imageclass: string = "";
    @Input() sourcesrc: string = "";
    @Input() thumbsrc: string = "";
    @Input() title: string = "";
    @Input() subtitle: string = "";
    public waiting = false;  //图片等待
    picClick() {
        var url = this.sourcesrc;
        this.photoViewer.show(encodeURI(url), this._getPicName(url));
    }
    _getPicName(filePath: string): string {
        var name = filePath;
        if (filePath.lastIndexOf("/") > 0)
            name = filePath.substr(filePath.lastIndexOf("/") + 1);
        return name;
    }
}
