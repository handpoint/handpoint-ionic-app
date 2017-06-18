import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UtilService } from '../../services/util.service';
import { DataService } from '../../services/data.service';
import { CurrencyService } from '../../services/currency.service';

declare var cordova;

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})
export class PayPage {

  private SHARED_SECRET: String = '0102030405060708091011121314151617181920212223242526272829303132';

  public mode: string = 'pay';
  private amount: string = '';
  private amountFormatted: string = '0';
  public saleParams: any = {
    amount: 0,
    currency: 826
  };
  public macAddress: string = '68:AA:D2:02:89:B6';
  public statusMessage: String;
  public events: any[] = [];

  public currency: string;
  public currencyFractionSize: number;

  constructor(
    private _ngZone: NgZone,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public util: UtilService,
    public data: DataService,
    public currencyService: CurrencyService,
    public platform: Platform) {
    // TODO this is not the proper place for init
    // Is cordova available ? 
    if (this.util.isCordova()) {
      this.initSDK();
    }
    this.currency = this.currencyService.getDefaultCode();
    this.currencyFractionSize = this.currencyService.getDefault().fractionSize;
  }

  ionViewWillEnter() {
    this.data.getCurrencyFromLocalStorage().then(() => {
      this.currency = this.data.currency.code;
      this.currencyFractionSize = this.data.currency.fractionSize;
      this.formatAmount();
    });
  }

  formatAmount() {
    // Format amount
    if (this.currencyFractionSize && this.currencyFractionSize > 0) {
      this.amountFormatted = this.util.formatCurrency(this.amount, this.currencyFractionSize);
    }
  }

  clicked(str: string) {
    this.amount = this.amount + str;
    if (parseFloat(this.amount) == 0) {
      this.amount = '0';
    }
    this.amountFormatted = this.util.formatCurrency(this.amount, this.currencyFractionSize);
  }

  delete() {
    if (this.amount && this.amount.length > 0) {
      this.amount = this.amount.slice(0, -1);
      this.amountFormatted = this.util.formatCurrency(this.amount, this.currencyFractionSize);
    }
  }

  initSDK() {
    var that = this;

    // Set event handler function
    that.configureEventHandler();
    // Init SDK with shared secret
    cordova.plugins.Handpoint.init({
      sharedSecret: that.SHARED_SECRET,
    }, function (result) {
      // Connect to default device
      cordova.plugins.Handpoint.connect({
        device: {
          name: "SureSwipe3708",
          address: that.macAddress,
          port: "1",
          connectionMethod: cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH
        }
      }, function (result) {
        that.statusMessage = 'Connected to device 68:AA:D2:02:89:B6';
      }, function (error) {
        that.util.toast('Error connecting device ' + error);
      });
    }, function (error) {
      that.util.toast('Error on SDK init ' + error);
    });
  }

  configureEventHandler() {
    var that = this;

    that.statusMessage = 'Registering events…';
    if (that.util.isCordova()) {
      that.statusMessage = 'Registering events… (Cordova available)';
      // Configure event handler
      cordova.plugins.Handpoint.eventHandler(function (event) {
        // Run asynchronous call inside Angular execution context so data binding works
        that._ngZone.run(() => {
          that.events.push(event);
        });
      }, function (error) {
        that.util.toast('Error registering event handler ' + error);
      });
    } else {
      that.util.toast('Bluetooth is not available on Browser platform');
    }
  }

  deviceDiscovery() {
    var that = this;

    that.statusMessage = 'Discovering devices…';
    if (that.util.isCordova()) {
      that.statusMessage = 'Discovering devices… (Cordova available)';
      cordova.plugins.Handpoint.listDevices({
        method: cordova.plugins.Handpoint.ConnectionMethod.SIMULATOR
      }, function (result) {
        that.events.push(result);
      }, function (error) {
        that.util.toast('Error discovering devices ' + error);
      });
    } else {
      that.util.toast('Bluetooth is not available on Browser platform');
    }
  }

  /**
   * Initiates a sale transaction
   */
  pay() {
    var that = this;
    that.statusMessage = 'Loading sale… ';
    if (that.util.isCordova()) {
      that.statusMessage = 'Loading sale… (Cordova available) ';
      cordova.plugins.Handpoint.sale(that.saleParams, function (result) {
        that.statusMessage = 'Sale completed ';
      }, function (error) {
        that.util.toast('Error running plugin ' + error);
      });
    } else {
      that.util.toast('Bluetooth is not available on Browser platform');
    }
  }

  refund() {
    // TODO
  }

}
