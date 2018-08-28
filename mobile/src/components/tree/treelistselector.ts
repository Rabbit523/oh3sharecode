import { TreeNodeChecked, TreeCheckboxBase } from 'oneheart-core';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { SelectorBase } from './selectorbase';

@Component({
	selector: 'treelistselector',
	templateUrl: 'treelistselector.html'
})

export class TreeListSelector extends SelectorBase {
	
	constructor(public navParams: NavParams, public view: ViewController) { super(navParams, view); }

	TreeitemClick(employee: TreeNodeChecked) {
		TreeCheckboxBase.SelectDictionaries.itemCheckClick(employee);
		this.CalcSelectItems();
		if (!TreeCheckboxBase.SelectDictionaries.getIsMulti()) {
			this.CurrentCatagoryItems.forEach(item => {
				item.checked = employee.id == item.id;
			});
		}
	}

	TreeExpendClick(index: number) {
		//处理下级根才对
		this.CurrentCatagoryItems[index].expend = 1 - this.CurrentCatagoryItems[index].expend;
		let level = 0;
		for (var i = 0; i < this.CurrentCatagoryItems.length; i++) {
			if (i > index) {
				if (this.CurrentCatagoryItems[i].depth > level) {
					this.CurrentCatagoryItems[i].show = 1 - this.CurrentCatagoryItems[i].show;
					continue;
				}
				if (this.CurrentCatagoryItems[i].depth == level) {
					return;
				}
			}
			if (i == index) {
				level = this.CurrentCatagoryItems[i].depth;
			}
			continue;
		}

	}
}