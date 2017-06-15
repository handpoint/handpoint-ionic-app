import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UtilService } from '../../services/util.service';

declare var cordova;

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})
export class PayPage {

  private SHARED_SECRET: String = '0102030405060708091011121314151617181920212223242526272829303132';

  public saleParams: any = {
    amount: 1000,
    currency: 826
  };
  public macAddress: string = '68:AA:D2:02:89:B6';
  public statusMessage: String;
  public events: any[] = [];

  constructor(
    private _ngZone: NgZone,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public util: UtilService,
    public platform: Platform) {
    // Is cordova available ?
    if (this.util.isCordova()) {
      //this.initSDK();
    }
  }

  clicked(str: string) {
    // TODO
  }

  delete() {
    // TODO 
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
        that.statusMessage = 'Error connecting device ' + error;
      });
    }, function (error) {
      that.statusMessage = 'Error on SDK init ' + error;
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
        that.statusMessage = 'Error registering event handler ' + error;
      });
    } else {
      that.statusMessage = 'Plugin is not available on Browser platform';
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
        that.statusMessage = 'Error listDevices ' + error;
      });
    } else {
      that.statusMessage = 'Plugin is not available on Browser platform';
    }
  }

  /**
   * Initiates a sale transaction
   */
  sale() {
    var that = this;
    that.statusMessage = 'Loading sale… ';
    if (that.util.isCordova()) {
      that.statusMessage = 'Loading sale… (Cordova available) ';
      cordova.plugins.Handpoint.sale(that.saleParams, function (result) {
        that.statusMessage = 'Sale completed ';
      }, function (error) {
        that.statusMessage = 'Error running plugin ' + error;
      });
    } else {
      that.statusMessage = 'Plugin is not available on Browser platform';
    }
  }

}
