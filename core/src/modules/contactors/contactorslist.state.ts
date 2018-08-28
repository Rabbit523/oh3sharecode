import { ContactorOrg } from '../../shared/models/webapi/contactor/contactorperson';

export interface ContactorslistState {
    contactors: ContactorOrg[],
    contactorsfiltered: ContactorOrg[],
    msg: string
}

export let initialContactorslistState: ContactorslistState = {
    contactors: [], 
    contactorsfiltered: [], 
    msg: ''
};