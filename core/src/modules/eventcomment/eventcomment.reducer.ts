import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EventCommentActions, EventCommentActionTypes } from './eventcomment.actions';
import { initialEventCommentState, EventCommentState, EventCommentParas } from './eventcomment.state';

export function EventCommentReducer(state = initialEventCommentState, action: EventCommentActions): EventCommentState {
  switch (action.type) {
    case EventCommentActionTypes.SHOW:
      let paras = action.payload as EventCommentParas;
      return Object.assign({}, state, {
        bgId: paras.bgid, contentType: paras.contentType,
        commentHeader: paras.comheader,
        HeadTitle: "新增 " + paras.bgid + " " + paras.comheader,
        comment:"",files:[]
      });
    case EventCommentActionTypes.SetPath:
      return Object.assign({}, state, { files: action.payload })
    case EventCommentActionTypes.SetComment:
      return Object.assign({}, state, { comment: action.payload })
    default:
      return state;

  }
}
