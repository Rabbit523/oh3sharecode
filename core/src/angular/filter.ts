import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BugTaskBaseModel } from '../shared/models/webapi/eventdetail/eventdetailjson';
import { EventDetailJsonHelper } from '../shared/models/helper/eventdetailjsonhelper';
import { Utils } from '../shared/utils/utils';
import { WebapiConfig } from '../shared/config/webapiconfig';
import { DepartPeopleHelper } from '../shared/models/helper/departpeoplehelper';
import { StaticCache } from '../shared/staticcache';


@Pipe({ name: 'ReplaceComa', pure: false })
export class ReplaceComaPipe implements PipeTransform {
    transform(value: string): string {
        var val = value.indexOf(",") == 0 ? value.substring(1) : value
        return val;
    }
}
@Pipe({ name: 'GetTaskUserDataFormat', pure: false })
export class GetTaskUserDataFormatPipe implements PipeTransform {
    transform(value: BugTaskBaseModel): string {
        var user = DepartPeopleHelper.GetPeopleDisplayValueByids((value.AssignedToUserId || 0).toString()).join(",");
        var time = value.PlannedEndDate;
        if (value.PlannedEndDate == null)
            time = "[无]";
        return user + " " + time;
    }
}
@Pipe({ name: 'Parentheses', pure: false })
export class ParenthesesPipe implements PipeTransform {
    transform(value: any): string {
        if (value && value !== "0")
            return "(" + value + ")";
        else
            return "";
    }
}

@Pipe({ name: 'TrimStr', pure: false })
export class TrimStrPipe implements PipeTransform {
    transform(value: string, char: string): string {
        var regEx = new RegExp("^[" + char + "]+|[" + char + "]+$", "g");
        return value.replace(regEx, "");
    }
}

@Pipe({
    name: "sanitizeHtml"
})
export class SanitizeHtml implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(value: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}

@Pipe({ name: "lastChar" })
export class LastCharPipe implements PipeTransform {
    transform(value: string, len: number) {
        return Utils.getLastCharactors(value, len);
    }
}

@Pipe({ name: "replaceHtml" })
export class ReplaceHtmlPipe implements PipeTransform {
    transform(value: string) {
        return Utils.trimHtmlTag(value);
    }
}

@Pipe({ name: "baseUrl" })
export class BaseUrlPipe implements PipeTransform {
    transform(value: string) {
        return StaticCache.Config.baseurl + value;
    }
}

@Pipe({ name: "formatStr" })
export class FormatStrPipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        return Utils.formatStr(value, args);
    }
}

@Pipe({ name: "formatTask" })
export class FormatTaskListPipe implements PipeTransform {
    transform(value: string[]) {
        if (!value)
            return "无日期";
        else
            return value[0] + ":" + value[1] || '[无]';
    }
}

@Pipe({ name: "toUserPic" })
export class ToUserPicPipe implements PipeTransform {
    transform(value: string) {
        let userphone: any = StaticCache.Webapiusers.userIdDic[value];
        return userphone;
    }
}
@Pipe({ name: "toWeekDay" })
export class ToWeekDayPipe implements PipeTransform {
    weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    transform(value: string) {
        //let str =value.split(/[/ :-]/g) //["2017", "09", "18", "08", "47"]
        let t = new Date(value.replace(/\-/g, '/'));
        if (t instanceof Date && value) {
            return this.weekday[t.getDay()] + " " + t.getHours() + "点";
        } else {
            return "";
        }
    }
}

@Pipe({ name: 'IdName' })
export class IDNamePipe implements PipeTransform {
    transform(value, args: string[]): any {
        return Utils.JsonToIdNameArray(value);
    }
}

@Pipe({ name: 'ToSaftStr' })
export class ToSaftStrPipe implements PipeTransform {
    transform(value, _default: string): any {
        if (value!="null" && value) {
            return value;
        } else {
            return _default;
        }
    }
}
