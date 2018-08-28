//json字典，键值对字典
export class JsonDictionary<T> {
    [index: string]: T; 
}

export class JsonDictionaryHelper {

    static Remove<T>(item: JsonDictionary<T>, index: string) {
        if (item.hasOwnProperty(index)) {
            delete item[index];
        }
    }
    static Keys<T>(item: JsonDictionary<T>): Array<string> {
        var n, count = [];
        for (n in item) {
            if (item.hasOwnProperty(n)) {
                count.push(n);
            }
        }
        return count;
    }
    static Values<T>(item: JsonDictionary<T>): Array<T> {
        var n, count = [];
        for (n in item) {
            if (item.hasOwnProperty(n)) {
                count.push(item[n]);
            }
        }
        return count;
    }
    static Size<T>(item: JsonDictionary<T>): number {
        var n, count = 0;
        for (n in item) {
            if (item.hasOwnProperty(n)) {
                count++;
            }
        }
        return count;
    }

    static GetNamesFromIds<T>(dic: JsonDictionary<T>, ids: string, removeid: string = "0"): string {
        var val = ""; var temp = ids.split(",");
        temp.forEach(element => {
            if (element != removeid) {
                if (val.length != 0)
                    val += "、";
                val += dic[element] ? dic[element] : "";
            }
        });
        return val;
    }
    static SetAParameter<T>(jsonDictionary: JsonDictionary<T>, vkey: string, value: any) {
        jsonDictionary[vkey] = value;
    }
}