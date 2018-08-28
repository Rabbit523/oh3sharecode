import { StaticCache } from '../../staticcache';
import { EventActionType } from '../webapi/eventlist/eventlistjson';
import { ApplicationProblem } from './applicationproblem';
import { JsonDictionary, JsonDictionaryHelper } from "../../../shared/models/common";
import { DBTask } from '../webapi/fieldnamefromdb/dbproblem';
import { EventListParaHelper } from './eventlistparahelper';

export class ConditionEnum {
    static QENone = 0;
    static QEAllEvent = 1;
    static QEUnfinishedEvent = 2;
    static QEMyUnfinishedEvent = 3;
    static QEFinishedEvent = 4;
    static QESelfDefineEvent = 5;
    static QENewProgressEvent = 6;
    static QENoProgressEvent = 7;
    static QEAttachmentEvent = 8;
    static QERelationEvent = 9;
    static QEVoteEvent = 10;
    static RedColorEvents = 11;
    static GreenColorEvents = 12;
    static MySmsEvents = 13;
    static PersonNoteEvents = 14;
    static BroadCastEvents = 15;
    static QEMyTodoList = 18;
    static QEExtTodoList = 19;
}




