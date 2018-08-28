import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AlertController } from 'ionic-angular';

import { CameraComponentOneCol } from './camera.componentonecol';

@Component({
  selector: 'cameracomponenttwocol',
  templateUrl: 'camera.componenttwocol.html'
})
export class CameraComponentTwoCol extends CameraComponentOneCol {
  constructor(protected alertCtrl: AlertController, public camera: Camera, public photoviewer: PhotoViewer) {
    super(alertCtrl, camera, photoviewer);
  }
}