import { IPageResult } from '../ipageresult';
export class PriorityDto {
    pr_id: number;
    pr_name: string;
    pr_sort_seq: number;
    pr_background_color: string;
    pr_style: string;
    pr_default: number;
    pr_actionid: number;

}
export class PriorityDtoJSON extends IPageResult<PriorityDto> { }