import { IPageResult } from '../ipageresult';
export class StatusDto {
    st_id: number;
    st_name: string;
    st_sort_seq: number;
    st_style: string;
    st_default: number;
    st_actionid: number;
}
export class StatusDtoJSON extends IPageResult<StatusDto>{ }