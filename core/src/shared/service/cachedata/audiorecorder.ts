
import { Injectable, ModuleWithProviders } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';
import { Utils } from "../../utils/utils";

@Injectable()
export class AudioRecorder {

  constructor(public media: Media) { }

  AudioRecorderState = { Ready: 0, Recording: 1, Recorded: 2, Playing: 3 };

  filename = this.NewFileName();
  mediaPlugin: MediaObject = null;
  state: number = this.AudioRecorderState.Ready;

  NewFileName(storageDirectory: string = ''): string {
    var result = storageDirectory + '/' + Utils.NowTime() + '.mp3';//+ '.3gp';//+ '.wav';
    return result;
  }


  startRecording(storageDirectory: string) {
    this.filename = this.NewFileName(storageDirectory);
    this.mediaPlugin = this.media.create(this.filename);

    this.mediaPlugin.startRecord();
    this.state = this.AudioRecorderState.Recording;
  }

  stopRecording() {
    if (this.mediaPlugin != null) {
      this.mediaPlugin.stopRecord();
    }
    this.state = this.AudioRecorderState.Recorded;
  }

  startPlayback(file: string) {
    this.mediaPlugin = this.media.create(file);
    this.mediaPlugin.play();
    this.state = this.AudioRecorderState.Playing;
  }

  stopPlayback() {
    if (this.mediaPlugin != null) {
      this.mediaPlugin.stop();
    }
    this.state = this.AudioRecorderState.Ready;
  }
}
