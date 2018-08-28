import { Component } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { StorageService } from 'oneheart-core';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
//0.系统介绍页面完成后必定跳转到1.用户登录页面，（第一次登录进入介绍页面）
export class TutorialPage {
  showSkip = true;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: StorageService,
  ) {
  }

  startApp() {
    this.storage.setHasSeenTutorial();
    this.navCtrl.push(LoginPage);
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
