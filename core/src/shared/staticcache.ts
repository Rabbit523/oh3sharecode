import { WebapiState } from "../modules/apistate";
import { TreeNode } from './models/common/treenode';
import { ContactorState } from './models/webapi/contactor/contactorperson';

export class StaticCache {
    static GlobalMsg = "";
    static authservicetoken: string = "";
    static Webapiusers: ContactorState = new ContactorState();
    static departmentEmployeeDepartmentNodes: TreeNode[] = [];
    static departmentEmployeeEmployeeNodes: TreeNode[] = [];
    static Config: WebapiState = new WebapiState();

    static setDepartmentEmployeeData(adata: any) {
        if (adata) {
            this.departmentEmployeeDepartmentNodes = adata.Department;
            this.departmentEmployeeEmployeeNodes = adata.Employee;
        }
    }
}

// import { NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
// export class CustomConfig { }

// export class SampleModule {
//     static forRoot(config: CustomConfig): ModuleWithProviders {
//         return {
//             ngModule: SampleModule,
//             providers: [SampleService, { provide: 'config', useValue: config }]
//         };
//     }
// }
// @Injectable()
// export class SampleService {
//     foo: any;
//     constructor(@Inject('config') private config: any) { }
// }