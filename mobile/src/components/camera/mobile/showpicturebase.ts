import { PhotoViewer } from '@ionic-native/photo-viewer';
export class ShowPictureBase {
    constructor(public photoViewer:PhotoViewer){}
    showpicture(url: string) {
        this.photoViewer.show(encodeURI(url), this._getPicName(url));
    }
    _getPicName(filePath: string): string {
        var name = filePath;
        if (filePath.lastIndexOf("/") > 0)
            name = filePath.substr(filePath.lastIndexOf("/") + 1);
        return name;

    }
}
