import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchDevicesPage } from '../search-devices/search-devices';
import { LogPage } from '../log/log';

import { UtilService } from '../../services/util.service';
import { CurrencyService } from '../../services/currency.service';
import { DataService } from '../../services/data.service';

declare var cordova;

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {

  public currencyCode: string;
  public currencies: any[];

  constructor(public navCtrl: NavController, public data: DataService, public util: UtilService, public currencyService: CurrencyService) {
    this.currencies = this.currencyService.getAll();
  }

  ionViewWillEnter() {
    this.data.getCurrency().then((currency) => {
      this.currencyCode = currency.code;
    });
  }

  searchDevices() {
    this.navCtrl.push(SearchDevicesPage);
  }

  log() {
    this.navCtrl.push(LogPage);
  }

  updateCurrency() {
    this.data.setCurrency(this.currencyCode);
  }

}
