import { Category } from '../../shared/models/webapi/category/category';
import { IntKeyValue } from '../../shared/models/common/keyvalue';

export interface CategoryPageState {
  Category: Category;
  httpCode: number;
  HeadTitle: string;
  fieldCategorys: IntKeyValue[];
}
