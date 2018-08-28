import { Utils } from '../../utils/utils';
import { JsonDictionary } from './jsondictionary';
export class TreeNode {
    id: number;
    name: string;
    parentid: number;
    constructor(vid: number, vname: string, vparentid: number) {
        this.id = vid;
        this.name = vname;
        this.parentid = vparentid;
    }
}
export class TreeNodeChecked extends TreeNode {
    checked: boolean;
    depth: number;
    expend: number;
    show: number;
    constructor(vid: number, vname: string, vparentid: number, vdepth: number, vexpend: number, vshow: number, vchecked = false) {
        super(vid, vname, vparentid);
        this.checked = vchecked;
        this.depth = vdepth;
        this.expend = vexpend;
        this.show = vshow;
    }
}
// 放在这里 因为是TreeNode的辅助包  方便引用
export class TreeNodeHelper {

    static GetNodesFromSorted<T extends TreeNode>(dict: JsonDictionary<T>, id: number): T {
        if (dict["key_" + id])
            return dict["key_" + id];
        return null;
    }
    
    static appendNodesSorted<T extends TreeNode>(dict: JsonDictionary<T>, datas: T[]): JsonDictionary<T> {
        if (datas != null) {
            //这里必须这样写 要排序
            datas.forEach(element => {
                dict["key_" + element.id] = element;
            });
        }
        return dict;
    }

    static getItemsByParentId<T extends TreeNode>(dict: JsonDictionary<T>, parentid: number): T[] {
        var result = new Array<T>();
        for (let it in dict) {
            if (dict[it] && dict[it].parentid == parentid) {
                result.push(dict[it]);
            }
        }
        return result;
    }
    static getPersonName(item: TreeNode): string {
        var result = Utils.getLastCharactors(item.name, 4);
        return result;
    }
    static GetNamesArray(treenodes: TreeNode[]): string[] {
        let val = new Array<string>();
        treenodes.forEach((node) => {
            val.push(node.name);
        });
        return val;
    }
    static GetNamesWithSplit(treenodes: TreeNode[], str: string = "、"): string {
        let val = "";
        treenodes.forEach((node) => {
            if (val != "") { val += str; }
            val += node.name;
        });
        return val;
    }
    static GetIdsWithSplit(treenodes: TreeNode[], str: string = ","): string {
        let val = "";
        treenodes.forEach((node) => {
            if (val != "") { val += str; }
            val += node.id;
        });
        return val;
    }
    static CalcAndSortTree(unsort: TreeNode[]): TreeNodeChecked[] {
        let temp: TreeNodeChecked[] = JSON.parse(JSON.stringify(unsort));
        let result = new Array<TreeNodeChecked>(); let dic = {};
        //分组
        while (temp.length > 0) {
            let item = temp.pop();
            if (item.parentid == 0) {
                item.show = 1;
                item.depth = 0;
                result.unshift(item);
            } else {
                if (!dic[item.parentid]) {
                    dic[item.parentid] = []
                }
                dic[item.parentid].unshift(item);
            }
        }
        let index = 1;
        while (this.HasKeyInObject(dic)) {
            if (index > 100) { break; };
            for (let i = 0; i < result.length; i++) {
                let ait = result[i];
                if (dic[ait.id]) {
                    result[i].expend = 0;
                    while (dic[ait.id].length > 0) {
                        let chi = dic[ait.id].pop();
                        chi.depth = index;
                        chi.show = 0;
                        result.splice(i + 1, 0, chi);
                        i++;
                    }
                    delete dic[ait.id];
                }
            }
            index++;
        }
        result.forEach(item => {
            item.parentid = 0;
        })
        return result;
    }

    static HasKeyInObject(dic): boolean {
        for (var it in dic) {
            return true;
        }
        return false;
    }
}