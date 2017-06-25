import { Storage } from '@ionic/storage';
import { Injectable, NgZone } from '@angular/core';
import { Platform, LoadingController, Events } from 'ionic-angular';

import { CurrencyService } from './currency.service';
import { UtilService } from './util.service';
import { DataService } from './data.service';

declare var cordova;

@Injectable()
export class SdkService {

  private SHARED_SECRET: String = '0102030405060708091011121314151617181920212223242526272829303132';

  public sharedSecret: string;
  public currency: any;

  public eventLog: any[] = [];

  public macAddress: string = '68:AA:D2:02:89:B6';
  public initialized: Promise<any>;

  constructor(
    private _ngZone: NgZone,
    public util: UtilService,
    public data: DataService,
    public events: Events,
    public storage: Storage,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public currencyService: CurrencyService) {

    // Set event handler function
    this.configureEventHandler();
  }

  init(): Promise<any> {
    var that = this;

    if (!that.initialized) {
      that.initialized = new Promise((resolve, reject) => {
        that.platform.ready().then(() => {
          that.storage.ready().then(() => {
            if (that.util.isCordova()) {
              that.data.getSharedSecretFromLocalStorage().then((sharedSecret) => {
                if (sharedSecret) {
                  // Init SDK with shared secret
                  cordova.plugins.Handpoint.init({
                    sharedSecret: sharedSecret,
                  }, function (result) {
                    // TODO get mac of default device from storage
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
                      resolve();
                    });
                  }, function (error) {
                    that.util.toast('Error on SDK init ' + error);
                    resolve();
                  });
                } else {
                  resolve();
                  that.util.toast('Shared secret not configured');
                }
              });
            } else {
              resolve();
            }
          });
        });
      });
      return that.initialized;
    } else {
      return that.initialized;
    }
  }

  setSharedSecret(sharedSecret: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Wait for sdk initializacion
      this.initialized.then(() => {
        // Save shared secret on storage and then set it up into SDK
        this.data.setSharedSecret(sharedSecret).then(() => {
          if (this.util.isCordova()) {
            cordova.plugins.Handpoint.setSharedSecret({
              sharedSecret: sharedSecret,
            }, function (result) {
              resolve(result);
            }, function (err) {
              reject(err);
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
          that.eventLog.unshift(event);
          // Publish event
          that.events.publish("sdk:" + event.event, event.data);
        });
      }, function (error) {
        that.util.toast('Error registering SDK event handler ' + error);
      });
    } else {
      that.util.toast('Bluetooth is not available in Browser platform');
    }
  }

  call(method: string, callback: any, config?: any) {
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
      that.util.toast('Bluetooth is not available in Browser platform');
    }
  }

  deviceDiscovery(): Promise<any> {
    var that = this;

    let loading = this.loadingCtrl.create({
      content: 'Searching for devices…'
    });
    loading.present();
    return new Promise((resolve, reject) => {
      // Subscribe event
      that.events.subscribe('sdk:deviceDiscoveryFinished', (data) => {
        loading.dismiss();
        resolve(data);
      });

      // call list devices sdk method
      if (that.util.isCordova()) {
        that.call('listDevices', function (result) { }, {
          connectionMethod: cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH
        });
      } else {
        loading.dismiss();
        resolve([]);
      }
    });
  }

}