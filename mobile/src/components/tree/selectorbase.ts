import { SelectDictionaries } from 'oneheart-core';
import { TreeCheckboxBase } from 'oneheart-core';
import { NavParams, ViewController } from 'ionic-angular';

export class SelectorBase extends TreeCheckboxBase {

	constructor(public navParams: NavParams, public view: ViewController) {
		super(navParams.get('datas') as SelectDictionaries, navParams.get('ids'), navParams.get('currentCatagoryid'), navParams.get('catagoryAndItem'), navParams.get('rootName'));
	}
	
	//进入该页面分三种情况
	//1.初次进入该页面，constructor-  ionViewDidEnter() {
	//2.点击部门后进入该页面，departmentClick-constructor-  ionViewDidEnter() {
	//3.点击最上面的返回菜单进入该页面 ionViewDidEnter() 
	//进入该页面精简成两种类型处理enterThroughConstructor
	//1.通过构造函数constructor-进入该页面 enterThroughConstructor=true;
	//2.不通过构造函数返回到该页面 enterThroughConstructor=false;
	ionViewDidEnter() {
		if (TreeCheckboxBase.enterThroughdismiss) {
			this._dismissData();
		}
		if (!TreeCheckboxBase.enterThroughConstructor) {
			this.ChangeDepartment(0);
		}
		TreeCheckboxBase.enterThroughConstructor = false;
	}

	_dismissData() {
		TreeCheckboxBase.enterThroughdismiss = true;
		this._dismissView(TreeCheckboxBase.SelectDictionaries.GetSelectNodes());
	}

	doprocess(buttonnum: number) {
		if (buttonnum) {
			this._dismissData();
		}
		else {
			TreeCheckboxBase.SelectDictionaries.clearSelected();
			this._dismissView("");
		}
	}

	_dismissView(data: any) {
		if (this.view)
			this.view.dismiss({ data: data });
	}
}