import { IPageResult } from '../ipageresult';
export class SelfDefineFieldDto {
    constructor() {
        this.custom_Enable = true;
        this.custom_Editable = true;
        this.custom_MustShow = false;
        this.custom_DiseditableStatuses = "";
        this.custom_InvisibleStatuses = "";
    }
    custom_DiseditableStatuses: string;
    custom_InvisibleStatuses: string;
    custom_FieldNameID: string;
    id: number;
    custom_Functionid: number;
    custom_Enable: boolean;
    custom_FieldOrder: number;
    custom_LabelName: string;
    prev_Custom_LabelName: string;
    custom_FieldType: number;

    custom_MustShow: boolean;
    custom_Editable: boolean;
}
export class SelfDefineFieldDtoJSON extends IPageResult<SelfDefineFieldDto>{ }