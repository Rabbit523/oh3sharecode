export class BugUserDtoModel {
     NoteDateDayStr:string;
     NoteDateTime:string;
     us_firstname:string;
     bg_short_desc:string;
     bg_ActionType:number;
     bu_bug:number;
     bu_user:number;
     bu_flag:number;
     bu_flag_datetime:string;
     bu_seen:number;
     bu_seen_datetime:string;
     bu_vote:number;
     bu_vote_datetime:string;
     bu_note:number;
     bu_note_datetime:string;
}

export class TractorBookmarkJson {
    Items: BugUserDtoModel[];
    NextPageLink: string;
    Count: number;
}