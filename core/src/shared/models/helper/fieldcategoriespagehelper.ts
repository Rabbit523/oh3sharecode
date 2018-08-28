import { CategoryNameDto, FieldsCategoryName, CategorySearch } from '../webapi/category/category';
export class FieldCategoriesBasePage {

    static filter(categoriesCache: FieldsCategoryName[], val: string, search: CategorySearch): FieldsCategoryName[] {
        let temp: FieldsCategoryName[] = new Array<FieldsCategoryName>();
        let pos = 0;
        for (let i = 0; i < categoriesCache.length; i++) {
            if ((search.action > 0 && search.action != categoriesCache[i].Functionid) || (search.action <= 0 && categoriesCache[i].BindIdName == "")) {
                pos++; continue;
            }
            temp.push({ Functionid: categoriesCache[i].Functionid, DefineFieldName: categoriesCache[i].DefineFieldName, BindIdName: categoriesCache[i].BindIdName, DefineFields: [] })
            for (let j = 0; j < categoriesCache[i].DefineFields.length; j++) {
                let it = categoriesCache[i].DefineFields[j];
                if (it.BindId == 0 || (it.BindId == search.bindId && it.BindType == search.bindtype)) {
                    if (!val || it.Name.indexOf(val) != -1) {
                        temp[i - pos].DefineFields.push(JSON.parse(JSON.stringify(it)));
                    }
                }
            }
        }
        return temp;
    }
    static groupfilter(categoriesCache: CategoryNameDto[]): FieldsCategoryName[] {
        var result = this._GroupByFieldsName(categoriesCache);
        return this._SortArray(result);
    }


    static _GroupByFieldsName(categoriesCache: CategoryNameDto[]): Array<FieldsCategoryName> {
        var result = new Array<FieldsCategoryName>(), groups: any = {};

        categoriesCache.forEach((item: CategoryNameDto) => {
            let defalutkey = ""
            if (item.DefineFieldIdName)
                defalutkey = item.DefineFieldIdName;
            if (!groups[defalutkey]) {
                groups[defalutkey] = [];
            }
            groups[defalutkey].push(item);
        });
        for (var groupName in groups) {
            var fieldscategoryname = new FieldsCategoryName();
            fieldscategoryname.DefineFields = groups[groupName];
            fieldscategoryname.DefineFieldName = groupName;
            fieldscategoryname.Functionid = groups[groupName][0].Functionid;
            fieldscategoryname.BindIdName = groups[groupName][0].BindIdName;
            result.push(fieldscategoryname);
        }
        return result;
    }


    static _SortArray(result: Array<FieldsCategoryName>): Array<FieldsCategoryName> {
        var _result: Array<FieldsCategoryName> = new Array<FieldsCategoryName>();
        result.forEach(item => {
            var _item: FieldsCategoryName = new FieldsCategoryName();
            _item.DefineFieldName = item.DefineFieldName;
            _item.BindIdName = item.BindIdName;
            _item.Functionid = item.Functionid;
            _item.DefineFields = this._treeSort(item.DefineFields, 0, 0);
            _result.push(_item);
        });
        return _result;
    }

    static _treeSort(items: CategoryNameDto[], parent: number, len: number): CategoryNameDto[] {
        var _items = new Array<CategoryNameDto>(); len = len + 1;
        items.forEach(aitem => {
            if (aitem.ParentId == parent) {
                let vitem = Object.assign({}, aitem, { Depth: len });
                _items = _items.concat([vitem], this._treeSort(items, aitem.Id, len));
            }
        })
        return _items;
    }
}