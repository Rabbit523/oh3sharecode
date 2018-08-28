import { TreeNode, TreeNodeChecked, TreeNodeHelper } from './treenode';
import { JsonDictionary, JsonDictionaryHelper } from './jsondictionary';

export class SelectDictionaries {
    protected MultiSelect: boolean;  //是否多选    
    protected CatagoryStack: Array<number> = new Array<number>();//当前选择部门的堆栈
    protected CatagoryDictionary: JsonDictionary<TreeNode> = new JsonDictionary<TreeNode>();
    protected ItemDictionary: JsonDictionary<TreeNodeChecked> = new JsonDictionary<TreeNodeChecked>();

    private SelectNodes = new JsonDictionary<TreeNode>();//选择的人员列表    

    constructor(CatagoryNodes: TreeNode[], ItemNodes: TreeNode[], multiSelect: boolean) {
        if (CatagoryNodes) TreeNodeHelper.appendNodesSorted(this.CatagoryDictionary, CatagoryNodes);
        if (ItemNodes) TreeNodeHelper.appendNodesSorted(this.ItemDictionary, ItemNodes);
        this.MultiSelect = multiSelect;
    }

    getIsMulti() { return this.MultiSelect; }
    clearSelected() {
        this.initSelects(new JsonDictionary<TreeNode>());
    }
    GetSelectNodes(): TreeNode[] {
        var result = JsonDictionaryHelper.Values(this.SelectNodes);
        if (JsonDictionaryHelper.Size(this.ItemDictionary) <= 0)  //没有item选择项的对话框,返回当前选择的分类节点
        {
            result = [this.GetCurrentSelectCatagoryNode()];
        }
        return result;
    }

    GetCurrentSelectSubCatagories(): TreeNode[] {
        return this.getCatagoriesBy(this.CatagoryStack[0]);
    }

    getCatagoriesBy(id: number): TreeNode[] {
        var result = TreeNodeHelper.getItemsByParentId(this.CatagoryDictionary, id);
        return result;
    }

    GetSelectCotent(defaultName:string): string {
        var result = '';
        if (JsonDictionaryHelper.Size(this.ItemDictionary) <= 0)  //没有item选择项的对话框,返回当前选择的分类节点
        {
            result = this.getCatagoryName(defaultName);
        }
        else {
            result = JsonDictionaryHelper.Size(this.SelectNodes).toString();
        }
        return result;
    }
    getCatagoryName(defaultName:string): string {
        var department = this.GetCurrentSelectCatagoryNode();
        if (department)
            return department.name;
        return defaultName;
    }

    itemCheckClick(employee: TreeNodeChecked) {
        if (this.MultiSelect) {
            //多选
            if (employee.checked) {
                this.SelectNodes[employee.id] = employee;
            }
            else {
                JsonDictionaryHelper.Remove(this.SelectNodes, employee.id.toString());
            }
        }
        else {
            this.SelectNodes = new JsonDictionary<TreeNode>();
            this.SelectNodes[employee.id] = employee;
        }
    }

    initSelects(value: JsonDictionary<TreeNode>) {
        this.SelectNodes = value;
    }

    setCurrentCatagoryId(id: number): number {
        var result = id;
        if (typeof id != 'undefined' && id) {
            //定义的有部门号，直接入栈
            if (id != this.CatagoryStack[0]) {
                this.CatagoryStack.unshift(id);
            }
        }
        else {
            //没有定义部门号，回退到上一级部门
            result = this.CatagoryStack.shift();
        }

        return result;
    }

    //当前所在的部门层次路径
    getCurrentCatagoryPath(): string {
        var result = "";
        var firstLine = true;
        this.CatagoryStack.forEach(departmentId => {
            let depName = "", node;
            node = TreeNodeHelper.GetNodesFromSorted(this.CatagoryDictionary, departmentId);
            if (node) {
                depName = node.name;
            }
            if (firstLine) {
                result = depName;
                firstLine = false;
            }
            else {
                if (depName)
                    result = depName + "-" + result;
            }
        }
        );
        return result;
    }

    GetCurrentNodeItemNodes(): TreeNodeChecked[] {
        var result = new Array<TreeNodeChecked>();
        var employees = TreeNodeHelper.getItemsByParentId(this.ItemDictionary, this.CatagoryStack[0]);
        employees.forEach(employee => {
            var checked = this.SelectNodes[employee.id] != undefined;
            var item = new TreeNodeChecked(employee.id, employee.name, employee.parentid
                , employee.depth, employee.expend, employee.show, checked);
            result.push(item);
        });
        return result;
    }

    GetCurrentSelectCatagoryNode(): TreeNode {
        let id = this.CatagoryStack[0];
        return TreeNodeHelper.GetNodesFromSorted(this.CatagoryDictionary, id)
    }

    getSelectedFirstWords(): string[] {
        var result = new Array<string>();
        JsonDictionaryHelper.Values(this.SelectNodes).forEach(element => {
            result.push(TreeNodeHelper.getPersonName(element));
        });
        return result;
    }

    getItemDictionaryby(ids: number[]): JsonDictionary<TreeNode> {
        var result = new JsonDictionary<TreeNode>();
        if ((ids != null) && (ids.length > 0)) {
            ids.forEach(id => {
                let node = TreeNodeHelper.GetNodesFromSorted(this.ItemDictionary, id);
                if (node) {
                    result[id] = node;
                }
            });
        }
        return result;
    }
}