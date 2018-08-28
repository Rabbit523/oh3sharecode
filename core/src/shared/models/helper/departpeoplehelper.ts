import { JsonDictionaryHelper } from '../common/jsondictionary';
import { StaticCache } from '../../../shared/staticcache';
import { TreeNode } from '../common/treenode';
import { JsonDictionary } from '../common/jsondictionary';

export class DepartPeopleHelper {
    static TreeNodesToDic(items: TreeNode[]): JsonDictionary<string> {
        var Dic = new JsonDictionary<string>();
        items.forEach(element => { Dic[element.id] = element.name; });
        return Dic;
    }
    static GetPeopleDisplayValueByids(ids: string, removeid: string = "0"): string[] {
        var result = new Array<string>();
        if (ids && ids.length > 0) {
            var items = JsonDictionaryHelper.GetNamesFromIds(this.TreeNodesToDic(StaticCache.departmentEmployeeEmployeeNodes), ids, removeid);
            if (items != "")
                result = [items];
        }
        return result;
    }
    static GetDepartmenDisplayValueByids(ids: string): string[] {
        var result = new Array<string>();
        var items = JsonDictionaryHelper.GetNamesFromIds(this.TreeNodesToDic(StaticCache.departmentEmployeeDepartmentNodes), ids);
        if (items != "")
            result = [items];
        return result;
    }
}
