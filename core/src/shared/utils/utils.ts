import { Headers } from '@angular/http';
import * as moment from "moment";


export class Utils {

    static log(...args: any[]) {
        console.log(args);
    }
    static tagchar: string = "丨"
    static AddTagsChar(tag: string) {
        return this.tagchar + tag + this.tagchar;
    }
    static RemoveEmpty(ary: string[], repStr: string = this.tagchar) {
        let nAry = [];
        let reg: RegExp = new RegExp(repStr, "g")
        for (let i = 0; i < ary.length; i++) {
            let key = ary[i].replace(/ /g, "").replace(reg, "");
            if (key) {
                nAry.push(key);
            }
        }
        return nAry;
    }

    static JsonToIdNameArray(value: any): any {
        let keys = [];
        for (let key in value) {
            keys.push({ id: key, name: value[key] });
        }
        return keys;
    }

    //2017-04-19 10.40.14
    //yyyy-MM-dd HH.mm.ss
    static strtodate(datestr: string, customFormat: string): Date {
        var momentObj = moment(datestr, customFormat);
        var result = momentObj.toDate();
        return result;
    }

    static NowTime(): string {
        var today = new Date();
        var result = moment(today).format('YYYY_MM_DD_HH_mm_ss');
        return result;
    }

    static NowDate(): string {
        let now = new Date(Date.now()); now.setMonth(now.getMonth() + 6); return moment(now).format('YYYY-MM-DD');
    }

    static JsonToUrlString(myObj: any): string {
        let result = "";
        Object.keys(myObj).forEach(function (key) {
            let obj = myObj[key];
            if (result != "") {
                result = result + "&";
            }
            result = result + key + "=" + obj;
        });
        return result;
    }

    static JsonToHeaders(myObj: any): Headers {
        var headers = new Headers();
        Object.keys(myObj).forEach(function (key) {
            let obj = myObj[key];
            headers.append(key, obj);
        });
        return headers;
    }

    static isNullOrEmpty(s: string): boolean {
        return !s;
    }

    // 手机号有如下规则:
    // (1)必须全为数字;
    // (2)必须是11位.(有人说还有10位的手机号,这里先不考虑);
    // (3)必须以1开头(有人见过以2开头的手机号吗?)
    // (4)第2位是34578中的一个.
    // /*** 
    //  * check mobile phone:(1)must be digit;(2)must be 11 
    //  * @param string 
    //  * @returns {boolean} 
    //  */  

    static IsAPhoneNumber(value: string): boolean {
        var result = false;
        var pattern = /^1[34578]\d{9}$/;
        if (pattern.test(value)) { result = true; }
        return result;
    }

    static GetNameFromEmail(value: string): string {
        var nameMatch = value.match(/^([^@]*)@/);
        var name = nameMatch ? nameMatch[1] : "";
        return name;
    }

    static GetPhoneNumberFromEmail(value: string): string {
        var result = "";
        let emailName = Utils.GetNameFromEmail(value);
        if (Utils.IsAPhoneNumber(emailName)) {
            result = emailName;
        }
        return result;
    }

    static checkTime(i: number): String {
        var result = "";
        if (i < 10) {
            result = "0" + i;
        }
        return result;
    }

    static getIndexFromKeyArray(keyArray: any[], searchkey: any): number {
        var result = 0;
        var index = 0;
        keyArray.forEach(element => {
            if (element == searchkey) {
                result = index;
            }
            index++;
        });
        return result;
    }


    static getValueFromKeyValueArray(keyArray: any[], valueArray: any[], searchkey: any): any {
        var index = Utils.getIndexFromKeyArray(keyArray, searchkey);
        return valueArray[index];
    }

    //得到字符总数
    static getChars(str: string): number {
        var i = 0;
        var c = 0.0;
        var unicode = 0;
        var len = 0;
        if (str == null || str == "") {
            return 0;
        }
        len = str.length;
        for (i = 0; i < len; i++) {
            unicode = str.charCodeAt(i);
            if (unicode < 127) { //判断是单字符还是双字符
                c += 1;
            } else {  //chinese
                c += 2;
            }
        }
        return c;
    }
    static sb_strlen(str: string): number {
        return Utils.getChars(str);
    }


    //截取字符
    static substringchinese(str: string, startp: number, endp: number): string {
        var i = 0;
        let c = 0;
        //let unicode = 0;
        let rstr = '';
        var len = str.length;
        var sblen = Utils.sb_strlen(str);
        if (startp < 0) {
            startp = sblen + startp;
        }
        if (endp < 1) {
            endp = sblen + endp;// - ((str.charCodeAt(len-1) < 127) ? 1 : 2);
        }
        // 寻找起点
        for (i = 0; i < len; i++) {
            if (c >= startp) {
                break;
            }
            var unicode = str.charCodeAt(i);
            if (unicode < 127) {
                c += 1;
            } else {
                c += 2;
            }
        }
        // 开始取
        for (i = i; i < len; i++) {
            var unicode = str.charCodeAt(i);
            if (unicode < 127) {
                c += 1;
            } else {
                c += 2;
            }
            rstr += str.charAt(i);
            if (c >= endp) {
                break;
            }
        }
        return rstr;
    }



    static getPageCount(count: number, pageSize: number): number {
        let Count = Math.ceil(count / pageSize);
        if (Count === 0)
            Count++;
        return Count;
    }


    static getFirstCharactors(value: string, len: number): string {
        var result = "";
        if (value) {
            result = value;
            if (value.length > len) {
                result = Utils.substringchinese(value, 0, len);
            }
        }
        return result;
    }

    static getLastCharactors(value: string, len: number): string {
        var result = "";
        if (value) {
            result = value;
            let stringlen = Utils.sb_strlen(value);
            if (stringlen > len) {
                let startindex = stringlen - len;
                result = Utils.substringchinese(value, startindex, stringlen);
            }
        }
        return result;
    }

    static isUrlAddress(value: string): boolean {
        var regex = /(http|https):\/\//;//(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?
        if (!regex.test(value)) {
            return false;
        } else {
            return true;
        }
        // var result = false;
        // var firstword = Utils.getFirstCharactors(value, 4);
        // if (firstword == 'http') {
        //     result = true;
        // }
        // return result;
    }


    static trimHtmlTag(value: string): string {
        var regex = /(<([^>]+)>)/ig;
        var result = value.replace(regex, "");
        return result;
    }


    // file extend name
    static getFileExt(fileName: string): string {
        var temp = fileName.substring(fileName.lastIndexOf('.'));
        var pos = temp.indexOf("?");
        if (pos != -1) {
            temp = temp.substring(0, pos);
        }
        return temp;
    }
    static getFileName(fileName: string): string {
        var temp = fileName.substring(fileName.lastIndexOf('/') + 1);
        var pos1 = temp.indexOf("?");
        if (pos1 != -1) {
            var pos0 = temp.indexOf(".");
            if (pos1 > pos0)
                temp = temp.substring(0, pos1);
        }
        return temp;
    }
    static openLink(link) {
        window.open(link, "_system", "location=yes");
    }

    //like guid
    static newGuid(): string {
        let str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        return str.replace(/[xy]/g, this.To16Str);
    }
    static To16Str(c) {
        let r = Math.random() * 16 | 0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }

    //???
    static formatStr(value: string, args: any[]): string {
        args.unshift(value);
        var allArgs = args;
        var format = allArgs[0];
        var result = format.substring(0, format.length);
        if (allArgs.length === 2 && typeof allArgs[1] === 'object') {
            var obj = allArgs[1];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    result = result.replace('{' + prop + '}', obj[prop]);
                }
            }
        } else {
            var args = allArgs.filter(this.filterfunction);
            for (var i = 0, len = args.length; i < len; i++) {
                result = result.replace('{' + i + '}', args[i]);
            }
        }
        return result;
    }
    static filterfunction(item, i) {
        return i > 0;
    }


}