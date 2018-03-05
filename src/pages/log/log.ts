import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { SdkService } from '../../services/sdk.service';
import { UtilService } from '../../services/util.service';

declare var cordova;

@Component({
  selector: 'page-log',
  templateUrl: 'log.html'
})
export class LogPage {

  public logs: string;

  constructor(public sdk: SdkService, public util: UtilService, public loadingCtrl: LoadingController) {

  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.sdk.getDeviceLogs().then((data) => {
      this.logs = data.logs;
      loading.dismiss();
    }, (error) => {
      this.util.toast("Error retrieving Card Reader logs");
      loading.dismiss();
    });
  }

}
