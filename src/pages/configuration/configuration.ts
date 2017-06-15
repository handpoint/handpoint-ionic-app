import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchDevicesPage } from '../search-devices/search-devices';

import { UtilService } from '../../services/util.service';

declare var cordova;

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {

  private CONNECTION_METHOD_SIMULATOR: number = 2;

  constructor(public navCtrl: NavController, public util: UtilService) {

  }

  searchDevices() {
    var connectionMethod = this.util.isCordova() ? cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH : this.CONNECTION_METHOD_SIMULATOR;
    this.navCtrl.push(SearchDevicesPage, {
      connectionMethod: connectionMethod
    });
  }

}
