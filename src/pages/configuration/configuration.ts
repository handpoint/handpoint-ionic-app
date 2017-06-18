import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchDevicesPage } from '../search-devices/search-devices';

import { UtilService } from '../../services/util.service';
import { CurrencyService } from '../../services/currency.service';
import { DataService } from '../../services/data.service';

declare var cordova;

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {

  private CONNECTION_METHOD_SIMULATOR: number = 2;

  public currencyCode: string;

  public currencies: any[];

  constructor(public navCtrl: NavController, public data: DataService, public util: UtilService, public currencyService: CurrencyService) {
    this.currencies = this.currencyService.getAll();
  }

  ionViewWillEnter() {
    this.data.getCurrencyFromLocalStorage().then(() => {
      this.currencyCode = this.data.currency.code;
    });
  }

  searchDevices() {
    var connectionMethod = this.util.isCordova() ? cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH : this.CONNECTION_METHOD_SIMULATOR;
    this.navCtrl.push(SearchDevicesPage, {
      connectionMethod: connectionMethod
    });
  }

  updateCurrency() {
    this.data.setCurrency(this.currencyCode);
  }

}
