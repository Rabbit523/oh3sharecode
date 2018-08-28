
import { Component, EventEmitter, Output } from '@angular/core';
import { Camera } from '@ionic-native/Camera';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Store } from '@ngrx/store';
import { AlertController, Platform } from 'ionic-angular';
import { AttachmentDisplay, AudioRecorder, AppState, MapShowAction, MapState, MapInfo } from 'oneheart-core';
import { ShowPictureBase } from './showpicturebase';
import { CameraOptionHelper } from './cameraoption';
import { PageUtils } from '../../../shared/models/cache/pageutils';
import 'rxjs/add/operator/filter';

declare var cordova: any;

@Component({
  selector: 'mediatoolcomponentrecord',
  templateUrl: 'mediatool.componentrecord.html'
})
export class MediaToolComponentRecord extends ShowPictureBase {
  @Output() AddAFileEvent = new EventEmitter();
  @Output() MoveToEvent = new EventEmitter();

  position: string;
  coords: any = { latitude: 0, longitude: 0 };
  storageDirectory: string = ''
  GeoLocating = false;
  mapList: MapState;
  constructor(protected alertCtrl: AlertController, public platform: Platform
    , private geolocation: Geolocation, public photoviewer: PhotoViewer, private camera: Camera, private file: File
    , public audioRecorder: AudioRecorder, protected store$: Store<AppState>) {
    super(photoviewer);
    this.onDeviceReady();
    this.store$.select(s => s.mapList).subscribe(list => { this.mapList = list; this.setData() });
  }

  onDeviceReady() {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) { return false; }
      if (this.platform.is('ios')) { this.storageDirectory = cordova.file.documentsDirectory; }  //需要测试
      else if (this.platform.is('android')) { this.storageDirectory = cordova.file.externalDataDirectory; }//成功
      else { return false; }
    });
  }

  WatchPosition() {
    this.GeoLocating = true;
    this.position = "获取经纬度...";
    this.geolocation.watchPosition({ timeout: 60000, enableHighAccuracy: true }).filter((p) => p.coords !== undefined).subscribe(geopos => {
      let res = geopos as Position;
      this.coords = res.coords;
      this.position = "转换成位置...";
      this.store$.dispatch(new MapShowAction({ lat: res.coords.latitude, log: res.coords.longitude }));
    })
  }
  GetPosition() {
    this.GeoLocating = true;
    this.position = "获取经纬度...";
    this.geolocation.getCurrentPosition().then(geopos => {
      let res = geopos as Position;
      this.coords = res.coords;
      this.position = "转换成位置...";
      this.store$.dispatch(new MapShowAction({ lat: res.coords.latitude, log: res.coords.longitude }));
    }).catch(error => { this.position = '获取位置失败！' + error.message; })
  }
  setData() {
    let pos: MapInfo = this.mapList.mapList[this.mapList.mapList.length - 1];
    if (pos) {
      this.position = pos.position;
      this.AddAttchment(pos.placeid.toString(), AttachmentDisplay.AttachmentType.location, this.position);
      this.MoveToEvent.emit(pos);
      this.GeoLocating = false;
    }
  }
  recordAudio() {
    if (this.audioRecorder.state == this.audioRecorder.AudioRecorderState.Recording) {
      try {
        this.audioRecorder.stopRecording();
        this.file.resolveLocalFilesystemUrl(this.audioRecorder.filename).then((fileEntry: any) => { this.AddAttchment(this.audioRecorder.filename, AttachmentDisplay.AttachmentType.audio); });
      }
      catch (e) { PageUtils.ShowPromt(this.alertCtrl, '录音无法停止的错误.'); }
    }
    else {
      try {
        this.audioRecorder.startRecording(this.storageDirectory);
      }
      catch (e) { PageUtils.ShowPromt(this.alertCtrl, '无法开启录音.'); }
    }
  }

  takePhoto() {
    this.camera.getPicture(CameraOptionHelper.getcameraop_TakePhoto(this.camera)).then((imagefile: any) => {
      this.AddAttchment(imagefile, AttachmentDisplay.AttachmentType.picture);
    }, (err: any) => { });
  }

  choosePhoto() {
    this.camera.getPicture(CameraOptionHelper.getcameraop_choosePhoto(this.camera)).then((imagefile: any) => {
      this.AddAttchment(imagefile, AttachmentDisplay.AttachmentType.picture);
    }, (err: any) => { });
  }

  chooseVideo() {
    this.camera.getPicture(CameraOptionHelper.getcameraop_chooseVideo(this.camera)).then((videofile: any) => {
      this.AddAttchment(videofile, AttachmentDisplay.AttachmentType.video);
    }, (err: any) => { });
  }

  private AddAttchment(filename: string, vfiletype: number, vcomment: string = "") {
    var item = AttachmentDisplay.Create(filename, vfiletype, vcomment);
    this.AddAFileEvent.emit(item);
  }
}