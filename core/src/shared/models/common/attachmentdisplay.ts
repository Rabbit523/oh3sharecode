import { JsonDictionary } from './jsondictionary';
export class AttachmentModel {
    constructor() { }
    filename: string;
    comment: string;
    attachmentType: number;
    fileicon: string;
}
export class AttachmentDisplay {

    static AttachmentType = { audio: 0, video: 1, picture: 2, word: 3, excel: 4, location: 5, comment: 6 };
   
    static getFileExtensionName(filename: string) { return filename.split('.').pop(); }
    static create(vname: string, vfileicon: string, vfiletype: number, vcomment: string) {
        var result = new AttachmentModel();
        result.filename = vname;
        result.attachmentType = vfiletype;
        result.fileicon = vfileicon;
        result.comment = vcomment;
        return result;
    }
    static getFileIcon(vfiletype: number): string {
        var result = "";
        switch (vfiletype) {
            case this.AttachmentType.audio:
                result = "assets/img/video.png";
                break;
            case this.AttachmentType.video:
                result = "assets/img/video.png";
                break;
            case this.AttachmentType.picture:
                result = "";
                break;
            case this.AttachmentType.word:
                result = "assets/img/video.png";
                break;
            case this.AttachmentType.excel:
                result = "assets/img/video.png";
                break;
            default:
                result = "assets/img/video.png";
                break;
        }
        return result;
    }


    static getFilenames(list: AttachmentModel[]): string[] {
        var result = new Array<string>();
        list.forEach(element => {
            result.push(element.filename);
        });
        return result;
    }

    static Create(filename: string, vfiletype: number, vcomment: string): AttachmentModel {
        var fileicon = filename;
        if (vfiletype != this.AttachmentType.picture) {
            fileicon = this.getFileIcon(vfiletype);
        }
        var item = AttachmentDisplay.create(filename, fileicon, vfiletype, vcomment);
        return item;
    }

    static AddAFile(SelectNodes: JsonDictionary<AttachmentModel>
        , filename: string, vfiletype: number, vcomment: string = "") {
        var item = this.Create(filename, vfiletype, vcomment);
        SelectNodes[filename] = item;
    }

}