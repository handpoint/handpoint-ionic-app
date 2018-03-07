import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { UtilService } from '../../services/util.service';
import { SdkService } from '../../services/sdk.service';
import { DataService } from '../../services/data.service';

declare var cordova;

@Component({
  selector: 'search-devices',
  templateUrl: 'search-devices.html'
})
export class SearchDevicesPage {

  public devices: any[] = [];
  public finishScan: boolean = false;

  constructor(
    public navCtrl: NavController,
    public sdk: SdkService,
    public loadingCtrl: LoadingController,
    public util: UtilService,
    public data: DataService) {

  }

  ionViewWillEnter() {
    if (this.util.isCordova()) {
      // Get list of devices from local storage (cache)
      this.data.getListDevices().then((devices) => {
        this.finishScan = true;
        if (devices && devices.length > 0) {
          this.devices = devices;
        } else {
          this.scan();
        }
      }, (error) => {
        this.finishScan = true;
      });
    } else {
      this.util.toast('Handpoint SDK is not available in Browser platform');
    }
  }

  scan() {
    let loading = this.loadingCtrl.create({
      content: 'Scanning devices'
    });
    loading.present();

    this.finishScan = false;
    this.sdk.listDevices().then((data) => {
      this.devices = data.devices;
      this.data.setListDevices(this.devices);
      this.finishScan = true;
      loading.dismiss();
    }, (error) => {
      this.finishScan = true;
      loading.dismiss();
    });
  }

  connect(device: any) {
    let loading = this.loadingCtrl.create({
      content: 'Connecting to device ' + device.name
    });
    loading.present();

    this.sdk.connect(device).then(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
      // Save as preferred device
      this.data.setPreferredDevice(device);
    }, (err) => {
      loading.dismiss();
      this.util.toast('Error connecting to ' + device.name + '. Try again');
    });

  }

}
