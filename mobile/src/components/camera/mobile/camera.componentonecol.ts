import { Component, EventEmitter, Output } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AlertController } from 'ionic-angular';

import { CameraOptionHelper } from './cameraoption';
import { ShowPictureBase } from "./showpicturebase";

@Component({
  selector: 'cameracomponentonecol',
  templateUrl: 'camera.componentonecol.html'
})
export class CameraComponentOneCol extends ShowPictureBase{
  profilePicture: Array<string> = new Array<string>();
  files = new Array<string>();

  @Output("pathArry") fileArry: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  
  constructor(protected alertCtrl: AlertController, public camera: Camera, public photoviewer: PhotoViewer) { 
    super(photoviewer)
   }

  PopAlertClick() {
    let alert = this.alertCtrl.create({
      title: '媒体',
      buttons: [{
        text: '手机相册',
        cssClass: "newRowAlertBtn",
        handler: () => {
          alert.dismiss();
          this.choosePhoto();
          return false;
        }
      },
      {
        text: '手机拍照',
        cssClass: "newRowAlertBtn",
        handler: () => {
          alert.dismiss();
          this.takePhoto();
          return false;
        }
      }, {
        text: '微视上传',
        cssClass: "newRowAlertBtn",
        handler: () => {
          alert.dismiss();
          this.chooseVideo();
          return false;
        }
      }
      ]
    });

    alert.present();

  }

  SetProfilePicture(url: string) {
    this.profilePicture.unshift(url);
    this.fileArry.emit(this.files);
  }
  takePhoto() {
    this.camera.getPicture(CameraOptionHelper.getcameraop_TakePhoto(this.camera)).then((imageData: any) => {
      let base64Image = imageData;
      this.files.unshift(base64Image);
      this.SetProfilePicture(base64Image);
    }, (err: any) => { })
  }
  choosePhoto() {
    this.camera.getPicture(CameraOptionHelper.getcameraop_choosePhoto(this.camera)).then((imageData: any) => {
      let base64Image = imageData;
      this.files.unshift(base64Image);
      this.SetProfilePicture(base64Image);
    }, (err: any) => {
    });
  }
  chooseVideo() {
    this.camera.getPicture(CameraOptionHelper.getcameraop_chooseVideo(this.camera)).then((imageData: any) => {
      let base64Image = imageData;
      this.files.unshift(base64Image);
      this.SetProfilePicture("assets/img/video.png");
    }, (err: any) => {
    });
  }
}
