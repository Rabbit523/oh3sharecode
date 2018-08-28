import { CustomFieldsModel,CustomFieldsSelectModel,CustomFieldsModalModel } from '../eventdetail/customdropdowndefine';


export class BugProblem {
    //普通字段
    fieldProblemWorkFlowStatus = new CustomFieldsModel();
    fieldProblemEndDate = new CustomFieldsModel();
    fieldProblemChange = new CustomFieldsModel();
    //人员部门 下拉框     
    fieldProblemFrom = new CustomFieldsSelectModel();
    fieldProblemLevel= new CustomFieldsSelectModel();
    fieldProblemType = new CustomFieldsSelectModel();
    fieldProblemProcessType = new CustomFieldsSelectModel();
    //category 1-n 下拉框
    fieldProblemResponsiblePerson = new CustomFieldsModalModel();
    fieldProblemMajorPerson = new CustomFieldsModalModel();
    fieldProblemResponsibleDepart = new CustomFieldsModalModel();
    fieldProblemSuperviseDepart = new CustomFieldsModalModel();
    fieldProblemCoordinateDepart = new CustomFieldsModalModel();

}

   
