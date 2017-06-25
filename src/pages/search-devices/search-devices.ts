import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { UtilService } from '../../services/util.service';
import { SdkService } from '../../services/sdk.service';

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
    public util: UtilService) {

  }

  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    this.finishScan = false;
    this.sdk.deviceDiscovery().then((data) => {
      this.devices = data.devices;
      this.finishScan = true;
    });
  }

  connect(device: any) {
    var that = this;

    if (that.util.isCordova()) {
      cordova.plugins.Handpoint.connect({
        device: {
          name: device.name,
          address: device.address,
          port: "1",
          connectionMethod: cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH
        }
      }, function (result) {
        that.util.toast('Successfully connected to ' + device.name);
      }, function (error) {
        that.util.toast('Error connecting to ' + device.name + ' ' + error);
      });
    } else {
      // TODO 'Plugin is not available in Browser platform';
    }
  }

}
