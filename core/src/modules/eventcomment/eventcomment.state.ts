
export class EventCommentParas {
    bgid: number;
    comheader: string;
    contentType: string;
}

export interface EventCommentState {
    HeadTitle: string;
    comment: string;
    contentType: string;
    files: string[] | object[];
    bgId: number;
    commentHeader: string;
}

export let initialEventCommentState: EventCommentState = {
    HeadTitle: "",
    comment: "",
    contentType: "",
    files: [],
    bgId: 0,
    commentHeader: "",
};
