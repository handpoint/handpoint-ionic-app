import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { UtilService } from '../../services/util.service';

declare var cordova;

@Component({
  selector: 'search-devices',
  templateUrl: 'search-devices.html'
})
export class SearchDevicesPage {

  public devices: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: UtilService) {
    //this.devices = this.navParams.data.device;
  }

  connect(simulator: boolean) {
    var that = this;

    if (that.util.isCordova()) {
      // TODO 'Connecting to ' + that.macAddress;
      cordova.plugins.Handpoint.connect({
        device: {
          name: "SureSwipe3708",
          address: "MAC_ADDRESS",
          port: "1",
          connectionMethod: simulator ? cordova.plugins.Handpoint.ConnectionMethod.SIMULATOR : cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH
        }
      }, function (result) {
        // TODO 'Connected to ' + that.macAddress;
      }, function (error) {
        // TODO 'Error connecting to ' + that.macAddress + ' ' + error;
      });
    } else {
      // TODO 'Plugin is not available on Browser platform';
    }
  }

}
