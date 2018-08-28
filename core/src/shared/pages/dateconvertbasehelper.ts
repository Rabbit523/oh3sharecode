export class DateConvertBaseHelper {
    static getCsharpDateStr(PlanDate: string) {
        return PlanDate.toLocaleString().replace(new RegExp("(T|Z)","g"), " ").trim();
    }
    static getDateStrFromCsharp(PlanDate: string) {
        let dataNow: string = "";
        if (PlanDate)
            dataNow = PlanDate.replace(" ", "T").trim();
        return dataNow;
    }

    static convertForBindUseLocalTime(date: Date) {
        //"2017-03-09T09:54:00" 必须这种格式才能加载//toISOString---timeZone
        var yyyy = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        var Mo = m < 10 ? ('0' + m) : m;
        var dd = d < 10 ? ('0' + d) : d;
        var HH = h < 10 ? ('0' + h) : h;
        var mm = mi < 10 ? ('0' + mi) : mi;
        return yyyy + '-' + Mo + '-' + dd + 'T' + HH + ':' + mm;
    }
    static NextDay(): string {
        var date: Date = new Date(Date.now());
        var newday = new Date(date.getTime() + (23 - date.getHours()) * 60 * 60 * 1000 + (59 - date.getMinutes()) * 60 * 1000 + (61 - date.getSeconds()) * 1000);
        return this.convertForBindUseLocalTime(newday);
    }
}