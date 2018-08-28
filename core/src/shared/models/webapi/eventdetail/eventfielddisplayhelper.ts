import { EventFieldDisplay } from './customdropdowndefine';
import { JsonDictionary } from '../../common/jsondictionary';
//事务功能字段的显示字典-列表类
export class EventFieldDisplayHelper {

    static EmptyStr: string = "[无]";
    static AddADisplay(result: JsonDictionary<EventFieldDisplay>, item: EventFieldDisplay): JsonDictionary<EventFieldDisplay> {
        if (!item.displayValue) {
            item.displayValue = EventFieldDisplayHelper.EmptyStr;
        }
        result[item.key] = item;
        return result;
    }
    static createTaskLocomotiveDisplays(): JsonDictionary<EventFieldDisplay> {
        var result = new JsonDictionary<EventFieldDisplay>();
        result['BugParticipantsName'] = new EventFieldDisplay('', '', '', '');
        return result;
    }
    static createProblemExtDisplays(): JsonDictionary<EventFieldDisplay> {
        var result = new JsonDictionary<EventFieldDisplay>();
        result['fieldProblemFrom'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemWorkFlowStatus'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemEndDate'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemChange'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemLevel'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemType'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemProcessType'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemResponsiblePerson'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemMajorPerson'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemResponsibleDepart'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemSuperviseDepart'] = new EventFieldDisplay('', '', '', '');
        result['fieldProblemCoordinateDepart'] = new EventFieldDisplay('', '', '', '');
        result['PlanDate'] = new EventFieldDisplay('', '', '', '');
        return result;
    }
    static createMainDisplays(): JsonDictionary<EventFieldDisplay> {
        var result = new JsonDictionary<EventFieldDisplay>();
        result['shortdesc'] = new EventFieldDisplay('', '', '', '');
        result['AssignToName'] = new EventFieldDisplay('', '', '', '');
        result['ProjectName'] = new EventFieldDisplay('', '', '', '');
        result['OrganizatoinName'] = new EventFieldDisplay('', '', '', '');
        result['CategoryName'] = new EventFieldDisplay('', '', '', '');
        result['StatusName'] = new EventFieldDisplay('', '', '', '');
        result['PriorityName'] = new EventFieldDisplay('', '', '', '');
        result['PlannedEndDate'] = new EventFieldDisplay('', '', '', '');
        return result;
    }

}