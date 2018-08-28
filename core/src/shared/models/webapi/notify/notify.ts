import { IPageResult } from '../ipageresult';
export class NotificationDTO{
    bp_id:number;
    hasread:number;
    qn_id:number;
    qn_date_created:string;
    qn_bug:number;
    qn_user:number;
    qn_status :string;
    qn_retries:number;
    qn_last_exception:string;
    qn_to:string;
    qn_subject :string;
    qn_body :string;
    NotifyTime:string;
    MsgSendDate:string;
    _qn_from :string;
    qn_from:string;
    NotificationTimeString:string;

    qn_statusResult:string;
    
    qn_retriesChinese:string;
}
export class NotificationDTOJson extends IPageResult<NotificationDTO>{}