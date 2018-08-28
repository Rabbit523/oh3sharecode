import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TreeNode, TreeNodeChecked, TreeCheckboxBase } from 'oneheart-core';
import { SelectorBase } from './selectorbase';

@Component({
	selector: 'navlistselector',
	templateUrl: 'navlistselector.html'
})

export class NavListSelector extends SelectorBase {

	constructor(public navController: NavController, public navParams: NavParams
		, public view: ViewController
	) {
		super(navParams, view);
	}
	
	TreeitemClick(employee: TreeNodeChecked) {
		TreeCheckboxBase.SelectDictionaries.itemCheckClick(employee);
		this.CalcSelectTile();
		this.CalcSelectCatagories();
		this.CalcSelectItems();
	}

	catagoryClick(department: TreeNode) {
		this.navController.push(NavListSelector, { currentCatagoryid: department.id, ids: null, datas: null, catagoryAndItem: this.navParams.get("catagoryAndItem") });
	}
}