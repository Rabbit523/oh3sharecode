import { ToastController, AlertController } from 'ionic-angular';

export enum ToastPosition { top, middle, bottom }
export class PageUtils {

  static ShowPromt(alert: AlertController, msg?: string) {
    if (!msg)
      alert.create({ title: '提示', subTitle: '表单填写不完整(带*号必填)、请核实！', buttons: [{ text: '确定' }] }).present();
    else
      alert.create({ title: '提示', subTitle: msg, buttons: [{ text: '确定' }] }).present();
  }
  static toastMessage(messinfo: string, toastCtrl?: ToastController, toastPosition?: ToastPosition, duration: number = 2500) {
    if (toastCtrl) {
      var opts = { message: messinfo, duration: duration, position: "bottom", cssClass: "" };
      if (toastPosition == ToastPosition.top) {
        opts.position = "top";
      }
      if (toastPosition == ToastPosition.middle) {
        opts.position = "middle";
        opts.cssClass = "MytoastClass";
      }
      if (toastPosition == ToastPosition.bottom) {
        opts.position = "bottom";
      }
    }
    let toast = toastCtrl.create(opts);
    toast.present();
  }
}