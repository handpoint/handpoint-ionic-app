import { Injectable } from '@angular/core';
import { ToastController, AlertController, Platform } from 'ionic-angular';

@Injectable()
export class UtilService {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public platform: Platform) {
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  isIOS() {
    return this.platform.is('ios');
  }

  isAndroid() {
    return this.platform.is('android');
  }

  isMobile() {
    return this.isIOS() || this.isAndroid();
  }

}

