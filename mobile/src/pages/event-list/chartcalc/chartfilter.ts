import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { StringKeyValue } from 'oneheart-core';

@Component({
    selector: "chartfilter",
    templateUrl: "chartfilter.html"
})
export class ChartFilter implements OnChanges {
    dataLength: number = 2;
    CheckedBox: Array<boolean> = Array<boolean>();
    emitdata: Array<string> = new Array<string>();

    @Output() setFilterData: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    @Input() Initdata: Array<string>;
    @Input() CheckBoxDataArray: Array<StringKeyValue>;

    ngOnChanges(): void {
        if (this.CheckBoxDataArray) {
            this.emitdata = []; this.CheckedBox = [];
            if (this.CheckBoxDataArray)
                this.CheckBoxDataArray.forEach((x, i) => {
                    if (i < this.dataLength) {
                        this.emitdata.push(x.key);
                        this.CheckedBox.push(true);
                    } else {
                        this.CheckedBox.push(false);
                    }
                });
        }
    }

    CheckArrayLength(event: any, key: string) {
        var select = 0;
        this.CheckedBox.forEach((x, i) => { if (x) { select++; } });
        if (select > this.dataLength) {
            let temp = Object.assign([], this.emitdata);//不能直接修改
            temp.shift(); temp.push(key);
            this.emitdata = temp;
            this.CheckBoxDataArray.forEach((x, i) => { if (this.emitdata.indexOf(x.key) > -1) { this.CheckedBox[i] = true; } else { this.CheckedBox[i] = false; } });
        } else if (select < this.dataLength) {
            this.CheckBoxDataArray.forEach((x, i) => { if (x.key == key) { this.CheckedBox[i] = true; } });
        }
    }

    MenuFilter(id: number) {
        if (id) {
            this.setFilterData.emit(this.emitdata);
        } else {
            this.setFilterData.emit([]);
        }
    }
}