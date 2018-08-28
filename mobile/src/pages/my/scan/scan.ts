import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Utils,EventConst } from 'oneheart-core';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html',
})
export class ScanPage {
    light: boolean;//判断闪光灯
    frontCamera: boolean;//判断摄像头

    constructor(public event: Events, private navCtrl: NavController,  private qrScanner: QRScanner) {
        this.light = false;
        this.frontCamera = false;
    }

    ionViewDidLoad() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    let scanSub = this.qrScanner.scan().subscribe((urlstr: string) => {
                        this.event.publish(EventConst.System_ShowConFirmMessage, { err: "", body: urlstr });
                        this.qrScanner.hide();
                        scanSub.unsubscribe();
                        this.navCtrl.pop();
                    });
                    this.qrScanner.show();
                } else if (status.denied) {
                    this.event.publish(EventConst.System_ShowConFirmMessage, { err: "未授权", body: "" });
                } else {
                    this.event.publish(EventConst.System_ShowConFirmMessage, { err: "其他错误", body: "" });
                }
            })
            .catch((e: any) => { this.event.publish(EventConst.System_ShowConFirmMessage, { err: "未知错误", body: "" }); Utils.log('Error is', e) });
    }

    ionViewDidEnter() {
        this.showCamera();
    }
    toggleLight() {
        if (this.light) {
            this.qrScanner.disableLight();
        } else {
            this.qrScanner.enableLight();
        }
        this.light = !this.light;
    }
    toggleCamera() {
        if (this.frontCamera) {
            this.qrScanner.useBackCamera();
        } else {
            this.qrScanner.useFrontCamera();
        }
        this.frontCamera = !this.frontCamera;
    }

    showCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    }
    hideCamera() {
        this.qrScanner.hide();
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    }
    ionViewWillLeave() {
        this.hideCamera();
    }
}
