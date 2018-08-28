export class MyNewPostComment {
    bg_short_desc: string;
    bp_bug: number;
    bp_user: number;
    bp_date: string;
    bp_comment: string;
    bp_Address: string;
    bg_ActionType: number;
}
export class MyNewPostCommentWithNamePic extends MyNewPostComment {
    constructor(Item: MyNewPostComment) {
        super();
        this.bg_short_desc = Item.bg_short_desc;
        this.bp_bug = Item.bp_bug;
        this.bp_user = Item.bp_user;
        this.bp_date = Item.bp_date;
        this.bp_comment = Item.bp_comment;
        this.bp_Address = Item.bp_Address;
        this.bg_ActionType = Item.bg_ActionType;
    }
    PersonPicurl: string;
    PersonLastName: string;
}
export class TxtDetailModel {
    ba_file: string;
    ba_id: number;
    ba_size: number;
    ba_content_type: string;
    seconds_ago: number;
    us_username: string;
    us_lastname: string;
    us_firstname: string;
    us_fullname: string;
    us_email: string;
    us_admin: number;
    bp_id: number;
    bp_bug: number;
    bp_comment: string;
    bp_user: number;
    bp_date: string;
    bp_type: string;
    bp_email_from: string;
    bp_email_to: string;
    bp_email_cc: string;
    bp_file: string;
    bp_size: number;
    bp_content_type: string;
    bp_hidden_from_external_users: number;
    PlaceID: number;
    Place: string;

}
export class PostItemShow {
    PersonIndex: number = -1;
    PersonPicurl: string = "";
    PersonPhone: string = "";
    personName: string = "";
    personLastName: string = "";
    personid: number;
    DateTimeStr: string = "";
    ShowText: string = "";
    ImgSrc: string = "";
    ImgAnchor: string = "";
    Imgtype: string = "";
    ContentType: string = "";
    postid: string;
    constructor(bp_id: number) {
        this.postid = bp_id.toString();
    }
}


export class ImgthumbModel {
    ImgId: string;
    ImgSrc: string;
    ImgAnchor: string;
}
export class PostTypeEnum {
    static Comment: string = "comment";
    static File: string = "file";
    static Update: string = "update";
}

export class PostListModel {
    TxtDetail: TxtDetailModel;
    ImgThb: ImgthumbModel;
    ChangeStr: string;
    bp_id: number;
    DateWeekStr: string;
    DateTimeStr: string;
    DateDayStr: string;
    constructor() {
        this.TxtDetail = new TxtDetailModel();
        this.ImgThb = new ImgthumbModel();
        this.ChangeStr = "";
    }

}
export class ProblemChangeModel {
    PeopleName: string;
    DateStr: string;
    Comment: string;
    ImgThbs: ImgthumbModel[];
}

export class ProblemChangListModel {
    PostImgArray: Array<ImgthumbModel>;
    ProblemChange: Array<ProblemChangeModel>;
}