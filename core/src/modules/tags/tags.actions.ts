import { Action } from '@ngrx/store';
import { TagsState } from "../../modules/tags";
import { JsonDictionary } from '../../shared/models/common/jsondictionary';
import { TreeNode } from '../../shared/models/common/treenode';

export const TagsActionTypes = {
  SHOWAllDic: '[Tags] SHOWAllDic',
  SETAllDic: '[Tags] SETAllDic',

  SHOWUserTags: '[Tags] SHOWUserTags',
  SETUserTags: '[Tags] SETUserTags',

  SHOWUserDic: '[Tags] SHOWUserDic',
  SETUserDic: '[Tags] SETUserDic',

  EditDicShow: '[Tags] EditDicShow',
  SETEditDic: '[Tags] SETEditDic',
  EditDicPost: '[Tags] EditDicPost',

  EditUserShow: '[Tags] EditUserShow',
  SETEditUser: '[Tags] SETEditUser',
  EditUserPost: '[Tags] EditUserPost'
};

export class SHOWAllDicAction implements Action {
  type = TagsActionTypes.SHOWAllDic;
  constructor(public payload: string) { }
}
export class SETAllDicAction implements Action {
  type = TagsActionTypes.SETAllDic;
  constructor(public payload: JsonDictionary<string>) { }
}


export class SHOWUserTagsAction implements Action {
  type = TagsActionTypes.SHOWUserTags;
  constructor(public payload: string) { }
}
export class SETUserTagsAction implements Action {
  type = TagsActionTypes.SETUserTags;
  constructor(public payload: TreeNode[]) { }
}


export class SHOWUserDicAction implements Action {
  type = TagsActionTypes.SHOWUserDic;
  constructor(public payload: string) { }
}
export class SETUserDicAction implements Action {
  type = TagsActionTypes.SETUserDic;
  constructor(public payload: TreeNode[]) { }
}

export class EditDicShowAction implements Action {
  type = TagsActionTypes.EditDicShow;
  constructor(public payload: number) { }
}
export class SETEditDicAction implements Action {
  type = TagsActionTypes.SETEditDic;
  constructor(public payload: TreeNode) { }
}
export class EditDicPostAction implements Action {
  type = TagsActionTypes.EditDicPost;
  constructor(public payload: TreeNode) { }
}

export class EditUserShowAction implements Action {
  type = TagsActionTypes.EditUserShow;
  constructor(public payload: number) { }
}
export class SETEditUserAction implements Action {
  type = TagsActionTypes.SETEditUser;
  constructor(public payload: TreeNode) { }
}
export class EditUserPostAction implements Action {
  type = TagsActionTypes.EditUserPost;
  constructor(public payload: any) { }
}


export type TagsActions = SHOWAllDicAction | SHOWUserTagsAction | SHOWUserDicAction | EditUserShowAction | EditDicShowAction |
  SETAllDicAction | SETUserTagsAction | SETUserDicAction | SETEditDicAction | SETEditUserAction |
  EditDicPostAction | EditUserPostAction;
