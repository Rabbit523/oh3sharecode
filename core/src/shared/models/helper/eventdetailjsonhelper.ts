import { CategoryLabel, CustomDropdownDefineModel, CustomFieldsModalModel, CustomFieldsModel, CustomFieldsSelectModel, EventFieldDisplay } from '../../models/webapi/eventdetail/customdropdowndefine';
import { ListItemBaseModel } from '../../models/webapi/eventdetail/dropdownjson';
import { EventDetailJson } from '../../models/webapi/eventdetail/eventdetailjson';
import { EventFieldDisplayHelper } from '../../models/webapi/eventdetail/eventfielddisplayhelper';
import { BugProblem } from '../../models/webapi/problem/bugproblem';
import { DepartPeopleHelper } from './departpeoplehelper';
import { DBProblem, DBTask } from '../webapi/fieldnamefromdb/dbproblem';
import { JsonDictionary } from '../common/jsondictionary';

export class EventDetailJsonHelper {

    static SaveAFieldbyCustomLabel(ItemDetail: EventDetailJson, custom_NameId: string, value: CustomFieldsModel) {
        for (var i = 0; i < ItemDetail.Item.customFields.length; i++) {
            var aitem = ItemDetail.Item.customFields[i];
            if (aitem.custom_FieldNameID === custom_NameId) { ItemDetail.Item.customFields[i] = value; break; }
        }
    }
    static SaveAFieldbyLabel(customFields: CustomFieldsModel[], custom_LabelName: string, value: string) {
        for (var i = 0; i < customFields.length; i++) {
            var aitem = customFields[i];
            if (aitem.custom_LabelName === custom_LabelName) { customFields[i].cd_value = value; break; }
        }
    }

    static SetAFieldbyCustomFieldNameID(ItemDetail: EventDetailJson, id: string, vcdvalue: string) {
        for (var i = 0; i < ItemDetail.Item.customFields.length; i++) {
            var aitem = ItemDetail.Item.customFields[i];
            if (aitem.custom_FieldNameID === id) { ItemDetail.Item.customFields[i].cd_value = vcdvalue; break; }
        }
    }



    static GetAFieldModalbyLabelName(ItemMain: EventDetailJson, searchlabe: string): CustomFieldsModalModel {
        var model = new CustomFieldsModalModel();
        model.Item = this.GetAFieldbyLabelName(ItemMain, searchlabe);
        return model;
    }
    static GetAFieldModalbyNameId(ItemMain: EventDetailJson, id: string): CustomFieldsModalModel {
        var model = new CustomFieldsModalModel();
        model.Item = this.GetAFieldbyCustomFieldNameID(ItemMain, id);
        return model;
    }
    static GetAFieldDropDownbyLabelName(ItemMain: EventDetailJson, CustomDropdownDefine: CustomDropdownDefineModel[], id: string): CustomFieldsSelectModel {
        var model = new CustomFieldsSelectModel();
        model.Item = this.GetAFieldbyCustomFieldNameID(ItemMain, id);
        model.Dropdown = new Array<CategoryLabel>();
        CustomDropdownDefine.forEach((aitem) => { if (aitem.DropDownKey == model.Item.custom_LabelName) model.Dropdown = aitem.DropDownValue; });
        model.Dropdown.forEach(x => { if (x.ct_id.toString() == model.Item.cd_value) { model.pageDisplay = x.ct_name; } });
        return model;
    }
    static GetAFieldbyLabelName(ItemMain: EventDetailJson, searchlabe: string): CustomFieldsModel {
        var val = new CustomFieldsModel();
        ItemMain.Item.customFields.forEach(aitem => { if (aitem.custom_LabelName === searchlabe) { val = Object.assign({}, aitem); } });
        return val;
    }
    static GetAFieldbyCustomFieldNameID(ItemDetail: EventDetailJson, id: string): CustomFieldsModel {
        var val = new CustomFieldsModel();
        ItemDetail.Item.customFields.forEach(aitem => { if (aitem.custom_FieldNameID === id) { val = Object.assign({}, aitem); } });
        return val;
    }




    static TaskLocomotive(ItemMain: EventDetailJson): JsonDictionary<EventFieldDisplay> {
        var BugParticipantsName = this.GetAFieldModalbyNameId(ItemMain, DBTask.GetTaskUser(ItemMain.ActionType));
        BugParticipantsName.pageDisplay = DepartPeopleHelper.GetPeopleDisplayValueByids(BugParticipantsName.Item.cd_value, ItemMain.Item.assignedto);
        var result = new JsonDictionary<EventFieldDisplay>();
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('BugParticipantsName', 'podium'
            , BugParticipantsName.Item.custom_LabelName, BugParticipantsName.pageDisplay.join(',')));
        return result;
    }

    static BugProblemTo(ItemMain: EventDetailJson, arrayT: CustomDropdownDefineModel[]): JsonDictionary<EventFieldDisplay> {
        var bugProblem = this.GetBugProblem(ItemMain, arrayT);
        var result = new JsonDictionary<EventFieldDisplay>();
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemResponsibleDepart', 'grid'
            , bugProblem.fieldProblemResponsibleDepart.Item.custom_LabelName,
            bugProblem.fieldProblemResponsibleDepart.pageDisplay.join(',')));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemWorkFlowStatus', ''
            , bugProblem.fieldProblemWorkFlowStatus.custom_LabelName,
            bugProblem.fieldProblemWorkFlowStatus.cd_value));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemEndDate', 'stopwatch'
            , bugProblem.fieldProblemEndDate.custom_LabelName,
            bugProblem.fieldProblemEndDate.cd_value));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemChange', 'warning'
            , bugProblem.fieldProblemChange.custom_LabelName,
            bugProblem.fieldProblemChange.cd_value));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemMajorPerson', 'ionic'
            , bugProblem.fieldProblemMajorPerson.Item.custom_LabelName,
            bugProblem.fieldProblemMajorPerson.pageDisplay.join(',')));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemResponsiblePerson', 'people'
            , bugProblem.fieldProblemResponsiblePerson.Item.custom_LabelName,
            bugProblem.fieldProblemResponsiblePerson.pageDisplay.join(',')));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemSuperviseDepart', 'megaphone'
            , bugProblem.fieldProblemSuperviseDepart.Item.custom_LabelName,
            bugProblem.fieldProblemSuperviseDepart.pageDisplay.join(',')));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemCoordinateDepart', 'help-buoy'
            , bugProblem.fieldProblemCoordinateDepart.Item.custom_LabelName,
            bugProblem.fieldProblemCoordinateDepart.pageDisplay.join(',')));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemType', 'options'
            , bugProblem.fieldProblemType.Item.custom_LabelName,
            bugProblem.fieldProblemType.pageDisplay));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemLevel', 'pin'
            , bugProblem.fieldProblemLevel.Item.custom_LabelName,
            bugProblem.fieldProblemLevel.pageDisplay));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemProcessType', 'podium'
            , bugProblem.fieldProblemProcessType.Item.custom_LabelName,
            bugProblem.fieldProblemProcessType.pageDisplay));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('fieldProblemFrom', 'pin'
            , bugProblem.fieldProblemFrom.Item.custom_LabelName,
            bugProblem.fieldProblemFrom.pageDisplay));

        var PlanDate = bugProblem.fieldProblemEndDate.cd_value ? bugProblem.fieldProblemEndDate.cd_value.replace("T", " ") : "[无]";
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('PlanDate', ''
            , bugProblem.fieldProblemEndDate.custom_LabelName, PlanDate));


        return result;
    }

    static GetBugProblem(ItemMain: EventDetailJson, CustomDropdownDefine: CustomDropdownDefineModel[]): BugProblem {
        var bugProblem = new BugProblem();
        //create
        bugProblem.fieldProblemResponsibleDepart = this.GetAFieldModalbyNameId(ItemMain, DBProblem.ResponsibleDepart);
        bugProblem.fieldProblemResponsibleDepart.pageDisplay = DepartPeopleHelper.GetDepartmenDisplayValueByids(bugProblem.fieldProblemResponsibleDepart.Item.cd_value);


        bugProblem.fieldProblemWorkFlowStatus = this.GetAFieldbyCustomFieldNameID(ItemMain, DBProblem.WorkFlowStatus);
        bugProblem.fieldProblemEndDate = this.GetAFieldbyCustomFieldNameID(ItemMain, DBProblem.EndDate);
        bugProblem.fieldProblemChange = this.GetAFieldbyCustomFieldNameID(ItemMain, DBProblem.Change);

        bugProblem.fieldProblemMajorPerson = this.GetAFieldModalbyNameId(ItemMain, DBProblem.MajorPerson);
        bugProblem.fieldProblemMajorPerson.pageDisplay = DepartPeopleHelper.GetPeopleDisplayValueByids(bugProblem.fieldProblemMajorPerson.Item.cd_value);

        bugProblem.fieldProblemResponsiblePerson = this.GetAFieldModalbyNameId(ItemMain, DBProblem.ResponsiblePerson);
        bugProblem.fieldProblemResponsiblePerson.pageDisplay = DepartPeopleHelper.GetPeopleDisplayValueByids(bugProblem.fieldProblemResponsiblePerson.Item.cd_value);

        bugProblem.fieldProblemSuperviseDepart = this.GetAFieldModalbyNameId(ItemMain, DBProblem.SuperviseDepart);
        bugProblem.fieldProblemSuperviseDepart.pageDisplay = DepartPeopleHelper.GetDepartmenDisplayValueByids(bugProblem.fieldProblemSuperviseDepart.Item.cd_value);

        bugProblem.fieldProblemCoordinateDepart = this.GetAFieldModalbyNameId(ItemMain, DBProblem.CoordinateDepart);
        bugProblem.fieldProblemCoordinateDepart.pageDisplay = DepartPeopleHelper.GetDepartmenDisplayValueByids(bugProblem.fieldProblemCoordinateDepart.Item.cd_value);

        bugProblem.fieldProblemFrom = this.GetAFieldDropDownbyLabelName(ItemMain, CustomDropdownDefine, DBProblem.From);
        bugProblem.fieldProblemLevel = this.GetAFieldDropDownbyLabelName(ItemMain, CustomDropdownDefine, DBProblem.Level);
        bugProblem.fieldProblemType = this.GetAFieldDropDownbyLabelName(ItemMain, CustomDropdownDefine, DBProblem.Type);
        bugProblem.fieldProblemProcessType = this.GetAFieldDropDownbyLabelName(ItemMain, CustomDropdownDefine, DBProblem.ProcessType);
        return bugProblem;
    }

    static ToEventFieldDisplayDictionary(item: EventDetailJson, AssignToName: string): JsonDictionary<EventFieldDisplay> {
        var ProjectName = this.GetTextBy(item.DropDown.Projects, item.Item.project.toString());
        var OrganizatoinName = this.GetTextBy(item.DropDown.Organizatoins, item.Item.org.toString());
        var PriorityName = this.GetTextBy(item.DropDown.Prioritys, item.Item.priority.toString());
        var CategoryName = this.GetTextBy(item.DropDown.Categorys, item.Item.category.toString());
        var StatusName = this.GetTextBy(item.DropDown.Statuss, item.Item.status.toString());

        var result = new JsonDictionary<EventFieldDisplay>();
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('shortdesc', 'flag', '描述', item.Item.shortdesc));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('ProjectName', '', '项 目', ProjectName));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('OrganizatoinName', '', '部 门', OrganizatoinName));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('AssignToName', '', '责任人', AssignToName));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('CategoryName', '', '重要性', CategoryName));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('StatusName', '', '状 态', StatusName));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('PriorityName', '', '优先级', PriorityName));
        EventFieldDisplayHelper.AddADisplay(result, new EventFieldDisplay('PlannedEndDate', '', '截止日期', item.Item.PlannedEndDate));

        return result;

    }
    static GetTextBy(SelectList: ListItemBaseModel[], value: string): string {
        var result = "无";
        SelectList.forEach((v, i) => { if (v.Value === value) { result = v.Text; } });
        return result;
    }
}
