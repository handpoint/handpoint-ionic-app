import { Storage } from '@ionic/storage';
import { Injectable, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';

import { CurrencyService } from './currency.service';
import { UtilService } from './util.service';

import { Events } from 'ionic-angular';

declare var cordova;

@Injectable()
export class SdkService {

  private SHARED_SECRET: String = '0102030405060708091011121314151617181920212223242526272829303132';

  public sharedSecret: string;
  public currency: any;

  public eventLog: any[] = [];

  public macAddress: string = '68:AA:D2:02:89:B6';

  constructor(
    private _ngZone: NgZone,
    public util: UtilService,
    public events: Events,
    public storage: Storage,
    public platform: Platform,
    public currencyService: CurrencyService) {

    // Set event handler function
    this.configureEventHandler();
  }

  init(sharedSecret?: string) {
    var that = this;

    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.storage.ready().then(() => {
          if (that.util.isCordova()) {
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
                resolve();
              }, function (error) {
                that.util.toast('Error connecting device ' + error);
                reject();
              });
            }, function (error) {
              that.util.toast('Error on SDK init ' + error);
              reject();
            });
          } else {
            resolve();
          }
        });
      });
    });
  }

  configureEventHandler() {
    var that = this;

    if (that.util.isCordova()) {
      // Configure event handler
      cordova.plugins.Handpoint.eventHandler(function (event) {
        // Run asynchronous call inside Angular execution context so data binding works
        that._ngZone.run(() => {
          that.eventLog.push(event);
        });
      }, function (error) {
        that.util.toast('Error registering SDK event handler ' + error);
      });
    } else {
      that.util.toast('Bluetooth is not available on Browser platform');
    }
  }

  call(method: string, callback: any, config?: any, ) {
    var that = this;

    if (that.util.isCordova()) {
      if (config) {
        cordova.plugins.Handpoint[method](config, callback, function (error) {
          that.util.toast('SDK error method ' + method + ': ' + error);
        });
      } else {
        cordova.plugins.Handpoint[method](callback, function (error) {
          that.util.toast('SDK error method ' + method + ': ' + error);
        });
      }
    } else {
      that.util.toast('Bluetooth is not available on Browser platform');
    }
  }

  /*deviceDiscovery() {
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
  }*/

}