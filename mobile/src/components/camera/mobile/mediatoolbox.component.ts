import { Component, EventEmitter, Output } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AttachmentDisplay, AttachmentModel, PlaceInfo, AudioRecorder, JsonDictionary, JsonDictionaryHelper, Utils } from 'oneheart-core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ShowPictureBase } from './showpicturebase';

@Component({
  selector: 'mediatoolboxcomponent',
  templateUrl: 'mediatoolbox.component.html'
})
export class MediaToolboxComponent extends ShowPictureBase {
  @Output() FilesChange = new EventEmitter<Array<string>>();
  @Output() MoveToEvent = new EventEmitter<PlaceInfo>();
  SelectNodes = new JsonDictionary<AttachmentModel>();
  filesArray: Array<AttachmentModel> = new Array<AttachmentModel>();

  constructor(protected alertCtrl: AlertController, public photoviewer: PhotoViewer, public audioRecorder: AudioRecorder) {
    super(photoviewer)
  }
  MoveTo(value: PlaceInfo) {
    this.MoveToEvent.emit(value);
  }

  AddAFile(attchment: AttachmentModel) {
    this.SelectNodes[attchment.filename] = attchment;
    this.CalcItems();
  }
  deletefile(file: AttachmentModel) {
    let actionSheet = this.alertCtrl.create({
      title: '确定要放弃该文件上传吗？',
      buttons: [
        { text: '确定', handler: () => { JsonDictionaryHelper.Remove(this.SelectNodes, file.filename); this.CalcItems(); } },
        { text: '取消', handler: () => { Utils.log('取消 clicked'); } }
      ]
    });
    actionSheet.present();
  }

  private CalcItems() {
    this.filesArray = JsonDictionaryHelper.Values(this.SelectNodes);
    this.FilesChange.emit(AttachmentDisplay.getFilenames(this.filesArray));
  }


  PlayAudioClick(filename: string) {
    if (this.audioRecorder.state == this.audioRecorder.AudioRecorderState.Playing) {
      try {
        this.audioRecorder.stopPlayback();
      }
      catch (e) {
        this.showAlert('无法停止播放录音的错误.');
      }
    }
    else if
    ((this.audioRecorder.state == this.audioRecorder.AudioRecorderState.Ready)
      || (this.audioRecorder.state == this.audioRecorder.AudioRecorderState.Recorded)) {
      try {
        this.audioRecorder.startPlayback(filename);
      }
      catch (e) {
        this.showAlert('无法播放录音:' + filename + "," + e.message);
      }
    }

  }
  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: '错误',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
