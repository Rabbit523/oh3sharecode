import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/from';
import { Category } from '../../shared/models/webapi/category/category';
import { CategoryEnum } from '../../shared/models/webapi/category/category';
import { AppState } from '../app.state';
import { CategoryService } from '../../shared/service/webapi/category.service';
import { EventConst, GlobalActionEnum } from '../../shared/config';
import { IntKeyValue } from '../../shared/models/common/keyvalue';
import { CategoryPageActionTypes, SetCategoryAction, SetCategoryfieldsAction, UpdateSuccAction } from './category.action'
import { StaticCache } from '../../shared/staticcache';

@Injectable()
export class CategoryEffects {
  constructor(public actions$: Actions, public ctService: CategoryService, public store$: Store<AppState>) { }

  @Effect() GetCategoryAction$ = this.actions$
    .ofType(CategoryPageActionTypes.FecthCategory)
    .map(toPayload)
    .switchMap(categoryId => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      if (categoryId > 0) {
        return this.ctService.GetCategory(categoryId)
          .map(data => {
            return new SetCategoryAction({ Category: data, httpCode: 0, HeadTitle: " 编辑分类", fieldCategorys: [] })
          })
          .catch(err => { return this.ctService.handleError("GetCategory", err); });
      }
      else {
        var category = new Category();
        category.DefineFieldId = -1 * categoryId;
        return Observable.from([category]).map(data => {
          return new SetCategoryAction({ Category: data, httpCode: 0, HeadTitle: " 新增分类", fieldCategorys: [] })
        });
      }
    });

  @Effect() SetCategoryAction$ = this.actions$
    .ofType(CategoryPageActionTypes.SetCategory)
    .map(toPayload)
    .switchMap(CategoryPageState => {
      let fileid = CategoryPageState.Category.DefineFieldId;
      //StaticCache.Config.PersonalizationJson
      return this.store$.select(s => s.Dictionary.extdic).take(1).map(
        dic => {
          let arry = new Array<IntKeyValue>();
          dic.forEach(adic => {
            adic.DefineFields.forEach(aitem => {
              if ((aitem.DefineFieldId == fileid) && ((aitem.BindId == StaticCache.Config.UserId && aitem.BindType == CategoryEnum.PersonCategories) || aitem.BindType == 0))
                arry.push(new IntKeyValue(aitem.Id, aitem.Name));
            });
          });
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new SetCategoryfieldsAction(arry)
        }
      )
    });

  @Effect() UpdateCategoryAction$ = this.actions$
    .ofType(CategoryPageActionTypes.UpdateCategory)
    .map(toPayload)
    .switchMap(category => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.ctService.InsertUpdate(category)
        .map(data => {
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.Event_CategoryAdded });
          return new UpdateSuccAction(200)
        })
        .catch(err => { return this.ctService.handleError("InsertUpdate", err); });
    });
}