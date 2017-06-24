import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

import { PayPage } from '../pay/pay';

import { SdkService } from '../../services/sdk.service';

declare var cordova;

@Component({
  selector: 'page-shared-secret',
  templateUrl: 'shared-secret.html'
})
export class SharedSecretPage {

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public sdk: SdkService,
    public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Configuring secret...'
    });
    loading.present();
    this.sdk.setSharedSecret(this.params.get("secret")).then(() => {
      loading.dismiss();
      alert("Shared secret configured " + this.params.get("secret"));
      this.navCtrl.push(PayPage);
    });
  }

}
