import { SelectDictionaries, TreeNodeHelper } from 'oneheart-core';
import { TreeNode } from 'oneheart-core';
import { ModalController, Modal } from 'ionic-angular';
import { TreeListSelector } from './treelistselector';
import { NavListSelector } from './navlistselector';

export class TreeSelectorHelper {

	static CreateModalTree(modalCtrl: ModalController, vcurrentCatagoryid: string, vids: number[]
		, CatagoryNodes: TreeNode[], ItemNodes: TreeNode[], multiSelect: boolean, title: Array<string>,headerTitle:string): Modal {
		
		var result = modalCtrl.create(NavListSelector,
			{
				rootName:headerTitle,
				currentCatagoryid: vcurrentCatagoryid,
				ids: vids,
				datas: new SelectDictionaries(CatagoryNodes, ItemNodes, multiSelect),
				catagoryAndItem: title
			}
		);
		return result;
	}
	static CreateModalCheck(modalCtrl: ModalController, vcurrentCatagoryid: string, vids: number[]
		, ItemNodes: TreeNode[], multiSelect: boolean, title: Array<string>,headerTitle:string): Modal {		

		let tree = TreeNodeHelper.CalcAndSortTree(ItemNodes);
		var result = modalCtrl.create(TreeListSelector,
			{
				rootName:headerTitle,
				currentCatagoryid: vcurrentCatagoryid,
				ids: vids,
				datas: new SelectDictionaries(null, tree, multiSelect),
				catagoryAndItem: title
			}
		);
		return result;
	}
}