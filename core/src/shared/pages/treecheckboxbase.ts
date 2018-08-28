import { SelectDictionaries } from '../models/common/selectdictionaries';
import { TreeNode, TreeNodeChecked } from '../models/common/treenode';

export class TreeCheckboxBase {
	static SelectDictionaries: SelectDictionaries = null;
	static enterThroughConstructor: boolean = null;
	static enterThroughdismiss: boolean = null;
	defaultName: string = "";
	//部门相关
	departmentname: string = null;
	departmentpathname: string = null;
	subdepartments: TreeNode[] = null;
	CurrentCatagoryItems: TreeNodeChecked[] = null;
	//选择的人员相关
	SelectCotent: string = null;
	SelectFirstNames: string[] = null;
	Title: Array<string> = ['部门', '人员'];
	constructor(datas: SelectDictionaries, ids: number[], departmentid: number, catagoryAndItem: Array<string>,rootName:string) {
		this.defaultName = rootName;
		TreeCheckboxBase.enterThroughdismiss = false;
		TreeCheckboxBase.enterThroughConstructor = true;  //新选择的部门，不是返回到上一级部门		//
		this.Title[0] = catagoryAndItem[0] || this.Title[0];
		this.Title[1] = catagoryAndItem[1] || this.Title[1]
		if (datas != null)   //不是当前对话框在选择分类后递归调用，是新建的对话框初始化
		{
			this.initSelects(datas, ids);
		}
		this.ChangeDepartment(departmentid);
	}


	initSelects(datas: SelectDictionaries, vids: number[]) {
		TreeCheckboxBase.SelectDictionaries = datas;
		var selectedIdsNode = TreeCheckboxBase.SelectDictionaries.getItemDictionaryby(vids);
		TreeCheckboxBase.SelectDictionaries.initSelects(selectedIdsNode);
	}


	ChangeDepartment(departmentid: number) {
		TreeCheckboxBase.SelectDictionaries.setCurrentCatagoryId(departmentid);
		this.CalcSelectTile();
		this.CalcSelectCatagories();
		this.CalcSelectItems();
	}

	CalcSelectItems() {
		this.SelectCotent = TreeCheckboxBase.SelectDictionaries.GetSelectCotent(this.defaultName);
		this.SelectFirstNames = TreeCheckboxBase.SelectDictionaries.getSelectedFirstWords();
	}
	CalcSelectCatagories() {
		this.subdepartments = TreeCheckboxBase.SelectDictionaries.GetCurrentSelectSubCatagories();
		this.CurrentCatagoryItems = TreeCheckboxBase.SelectDictionaries.GetCurrentNodeItemNodes();
	}
	CalcSelectTile() {
		this.departmentname = TreeCheckboxBase.SelectDictionaries.getCatagoryName(this.defaultName);
		this.departmentpathname = TreeCheckboxBase.SelectDictionaries.getCurrentCatagoryPath();
	}
}