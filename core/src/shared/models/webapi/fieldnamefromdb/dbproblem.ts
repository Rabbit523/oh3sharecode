export class DBProblem {
    static From = "Field_4_1025094500";
    static Type = "Field_4_1025094501";
    static ResponsiblePerson = "Field_4_1025094502";
    static ProcessType = "Field_4_1025094503";
    //人员部门 下拉框 
    static CoordinateDepart = "Field_4_1025094504";
    static SuperviseDepart = "Field_4_1025094505";
    //category 1-n 下拉框
    static MajorPerson = "Field_4_1025094506";
    static EndDate = "Field_4_1025094507";
    static ResponsibleDepart = "Field_4_1025094508";
    static Change = "Field_4_1025094509";
    static WorkFlowStatus = "Field_4_1025094510";
    static Level = "Field_4_1025094511";
}
export class DBFixed {
    static KeepOnfile = "Field_0_1_Fixed";
}

export class DBTask {
    static GetTaskUser(act: number) { return "Field_" + act + "_0_Auto"; }
}