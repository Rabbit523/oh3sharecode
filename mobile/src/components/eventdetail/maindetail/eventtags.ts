import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppState, TreeNode, JsonDictionary, JsonDictionaryHelper, Utils } from 'oneheart-core';
import { TreeSelectorHelper } from '../../tree/treeselectorhelper';
import { ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';

@Component({
    selector: "eventtags",
    templateUrl: 'eventtags.html'
})
export class EventTags {
    constructor(public modal: ModalController, public store$: Store<AppState>) { }
    allTags = [];
    @Input() get tags() { return this.allTags.join(" "); }
    set tags(val: string) { this.allTags = []; if (val) this.allTags = Utils.RemoveEmpty(val.split(" ")); }
    @Input() id: number = 0;
    @Output() tagsChange = new EventEmitter;
    modTags() {
        this.store$.select(s => s.Tags).take(1).subscribe(UDTags => {
            let tagsTree = UDTags.UserTags;
            let root = "0", selected = [], treeTitle = ["", "我的标签"];
            tagsTree.forEach(el => { if (this.allTags.indexOf(el.name) != -1) selected.push(el.id); })
            let modal = TreeSelectorHelper.CreateModalCheck(this.modal, root, selected, tagsTree, true, treeTitle,"编辑标签");
            modal.onDidDismiss((adata) => {
                //this._sigleTag(adata.data);
                this._multiTag(adata.data, UDTags.UserDicTags);
            });
            modal.present();
        });
    }
    _sigleTag(data: TreeNode[]) {
        if (data.length > 0) {
            let str = "";
            data.forEach(el => {
                if (str) { str += " "; };
                str += Utils.AddTagsChar(el.name);
            });
            this.tags = str;
            this.tagsChange.emit(str);
        }
    }
    _multiTag(data: TreeNode[], cdata: TreeNode[]) {
        if (data.length > 0) {
            let json = new JsonDictionary<string>();
            data.forEach(el => {
                json[Utils.AddTagsChar(el.name)] = el.name;
                cdata.forEach(cel => {
                    if (cel.parentid == el.id) {
                        json[Utils.AddTagsChar(cel.name)] = cel.name;
                    }
                })
            });
            let val = JsonDictionaryHelper.Keys(json).join(" ");
            this.tags = val;
            this.tagsChange.emit(val);
        }
    }


}