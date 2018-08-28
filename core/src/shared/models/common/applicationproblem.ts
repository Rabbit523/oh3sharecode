import { JsonDictionary } from "./jsondictionary";

export class ApplicationProblem {

    // 未处理        未处理     
    //         审核
    // 已审核
    //         接受  
    // 处理中        处理中
    //         处理
    // 已处理        已处理  
    //         验收
    // 已验收        已验收

    //工作流指令 和工作流设计统一
    static report = "审核";
    static change = "接受";
    static check = "处理";
    static back = "验收驳回";
    static pass = "验收通过";

    //工作流命令显示
    static problemWorkflowscommand = {
        "审核": { name: "审核", icon: "code-download" },
        "接受": { name: "接受", icon: "construct" },
        "处理": { name: "处理", icon: "eye" },
        "验收驳回": { name: "驳回", icon: "redo" },
        "验收通过": { name: "通过", icon: "checkmark-circle-outline" },
    };
    //工作流状态  显示使用
    //update bugs set StateName='' where StateName=''
    static problemWorkflowstatusnew = "未处理";
    static problemWorkflowstatusreport = "未处理";
    static problemWorkflowstatuschange = "处理中";
    static problemWorkflowstatuscheck = "已处理";
    static problemWorkflowstatusback = "验收驳回";
    static problemWorkflowstatuscomplate = "已验收";

    //事务状态  查询使用
    //update statuses set st_name='已验收' where st_id=6
    //update statuses set st_name='已审核' where st_id=7
    //update statuses set st_name='处理中' where st_id=8
    //update statuses set st_name='未处理' where st_id=9
    //update statuses set st_name='已处理' where st_id=10    
    static problemstatusnew = "未处理";//9
    static problemstatusreport = "已审核";//7
    static problemstatuschange = "处理中";//8    
    static problemstatuscheck = "已处理";//10
    static problemstatuscomplate = "已验收";//6


}
