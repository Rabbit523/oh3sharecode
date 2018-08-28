import { StringDictionaryMap } from "../eventdetail/intkeyvalue";

export class CommandState {
    Commands: DocumentCommandModel[];
    AvailiableStates: StringDictionaryMap[];
    functionName: string;
    Id: number;
    StateNameToSet: string;
}

export class DocumentCommandModel {
    key: string;
    value: string;
    Classifier: string;
}