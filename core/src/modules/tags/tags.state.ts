import { JsonDictionary } from '../../shared/models/common/jsondictionary';
import { TreeNode } from '../../shared/models/common/treenode';

export interface TagsState {
    AllDicTags: JsonDictionary<string>;
    UserTags: TreeNode[];
    UserDicTags: TreeNode[];
    EditDicTag: TreeNode;
    EditUserTag: TreeNode;
}

export let initialTagsState: TagsState = { AllDicTags: {}, UserTags: [], UserDicTags: [], EditDicTag: new TreeNode(0, "", 0), EditUserTag: new TreeNode(0, "", 0) };