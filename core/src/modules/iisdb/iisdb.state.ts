import { IISSite } from "../../shared/models/webapi/iisdb/iisdb";
export interface IISDBState { List: IISSite }
export let initialIISDBState: IISDBState = { List: new IISSite() };
