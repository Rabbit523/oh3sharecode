import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicModule } from 'ionic-angular';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { SingleAudioPlayer } from './singleaudioplayer';
import { SingleVideoPlayer } from './singlevideoplayer';
import { CameraComponentOneCol } from './mobile/camera.componentonecol';
import { CameraComponentTwoCol } from './mobile/camera.componenttwocol';
import { MediaToolComponentRecord } from './mobile/mediatool.componentrecord';
import { MediaToolboxComponent } from './mobile/mediatoolbox.component';
import { CameraComponentWeb } from './web/camera.componentweb';


//组件注册从app.module.ts中分离，为其他的页面引入共享组件做准备
@NgModule({
  imports: [
    IonicModule
    , VgCoreModule, VgControlsModule , VgOverlayPlayModule, VgBufferingModule
  ],
  declarations: [
    CameraComponentOneCol, CameraComponentTwoCol, CameraComponentWeb
    , MediaToolboxComponent, MediaToolComponentRecord
    , SingleVideoPlayer, SingleAudioPlayer
  ],
  exports: [
    CameraComponentOneCol, CameraComponentTwoCol, CameraComponentWeb
    , MediaToolboxComponent, MediaToolComponentRecord
    , SingleVideoPlayer, SingleAudioPlayer
  ],
  providers: [Camera]
})
export class CameraModule {
}
