import { SelfDefineFunctionsJSON, SelfDefineFunctions } from "../../shared/models/webapi/function/function";

export interface SelfDefineFunctionsState { List: SelfDefineFunctionsJSON, SelfDefineFunctions: SelfDefineFunctions, Dic: JSON }
export let initialSelfDefineFunctionsState: SelfDefineFunctionsState = { List: new SelfDefineFunctionsJSON(), SelfDefineFunctions: new SelfDefineFunctions(), Dic: <JSON>{} };
