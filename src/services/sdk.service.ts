import { Storage } from '@ionic/storage';
import { Injectable, NgZone } from '@angular/core';
import { Platform, LoadingController, Events } from 'ionic-angular';

import { CurrencyService } from './currency.service';
import { UtilService } from './util.service';
import { DataService } from './data.service';

declare var cordova;

@Injectable()
export class SdkService {

  private sharedSecret: string;

  constructor(
    private _ngZone: NgZone,
    public util: UtilService,
    public data: DataService,
    public events: Events,
    public storage: Storage,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public currencyService: CurrencyService) {

    this.platform.ready().then(() => {
      try {
        // Set event handler function
        this.eventHandler();
      } catch (e) {
        this.util.toast("Error initializing Handpoint SDK");
      }
    });

  }

  /**
   * Publish every handpoint event to the event ionic framework with the 'handpoint:' prefix
   */
  eventHandler() {
    var that = this;

    if (that.util.isCordova()) {
      // Configure event handler
      cordova.plugins.Handpoint.eventHandler(function (event) {
        // Run asynchronous call inside Angular execution context so data binding works
        that._ngZone.run(() => {
          // Publish event
          if (event.event == 'connectionStatusChanged') {
            that.events.publish("handpoint:" + event.event + ":" + event.data.status, event.data);
          } else if (event.event == 'endOfTransaction') {
            that.events.publish("handpoint:" + event.event + ":" + event.data.transactionResult.finStatus, event.data);
          } else {
            that.events.publish("handpoint:" + event.event, event.data);
          }
        });
      }, function (error) {
        that.util.toast('Error registering SDK event handler ' + error);
      });
    } else {
      that.util.toast('Handpoint SDK is not available in Browser platform');
    }
  }

  setup(): Promise<any> {
    return this.callAsyncSdkMethod("setup", {
      successEvenList: [],
      errorEvenList: []
    }, {});
  }

  setSharedSecret(sharedSecret: string): Promise<any> {
    this.sharedSecret = sharedSecret;
    return this.callAsyncSdkMethod("setSharedSecret", {}, {
      sharedSecret: sharedSecret
    });
  }

  connect(device: any): Promise<any> {
    return this.callAsyncSdkMethod("connect", {
      successEvenList: ['handpoint:connectionStatusChanged:Connected'],
      timeout: 15000
    }, {
        device: {
          name: device.name,
          address: device.address,
          port: "1",
          connectionMethod: cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH
        }
      });
  }

  disconnect(device: any): Promise<any> {
    return this.callAsyncSdkMethod("connect", {
      successEvenList: ['handpoint:connectionStatusChanged:Disconnected'],
      timeout: 15000
    }, {
        device: {
          name: device.name,
          address: device.address,
          port: "1",
          connectionMethod: cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH
        }
      });
  }

  sale(amount: number, currency: number, map?: any): Promise<any> {
    return this.callAsyncSdkMethod("sale", {
      successEvenList: ['handpoint:endOfTransaction:AUTHORISED'],
      errorEvenList: ['handpoint:endOfTransaction:DECLINED', 'handpoint:endOfTransaction:FAILED', 'handpoint:endOfTransaction:CANCELLED']
    }, {
        amount: amount,
        currency: currency,
        map: map
      });
  }

  refund(amount: number, currency: number, map?: any): Promise<any> {
    return this.callAsyncSdkMethod("refund", {
      successEvenList: ['handpoint:endOfTransaction:AUTHORISED'],
      errorEvenList: ['handpoint:endOfTransaction:DECLINED', 'handpoint:endOfTransaction:FAILED', 'handpoint:endOfTransaction:CANCELLED']
    }, {
        amount: amount,
        currency: currency,
        map: map
      });
  }

  saleReversal(amount: number, currency: number, originalTransactionID: string, map?: any): Promise<any> {
    return this.callAsyncSdkMethod("saleReversal", {
      successEvenList: ['handpoint:endOfTransaction:AUTHORISED'],
      errorEvenList: ['handpoint:endOfTransaction:DECLINED', 'handpoint:endOfTransaction:FAILED', 'handpoint:endOfTransaction:CANCELLED']
    }, {
        amount: amount,
        currency: currency,
        originalTransactionID: originalTransactionID,
        map: map
      });
  }

  refundReversal(amount: number, currency: number, originalTransactionID: string, map?: any): Promise<any> {
    return this.callAsyncSdkMethod("refundReversal", {
      successEvenList: ['handpoint:endOfTransaction:AUTHORISED'],
      errorEvenList: ['handpoint:endOfTransaction:DECLINED', 'handpoint:endOfTransaction:FAILED', 'handpoint:endOfTransaction:CANCELLED']
    }, {
        amount: amount,
        currency: currency,
        originalTransactionID: originalTransactionID,
        map: map
      });
  }

  signatureResult(accepted: boolean): Promise<any> {
    return this.callAsyncSdkMethod("signatureResult", {}, {
      accepted: accepted
    });
  }

  listDevices(): Promise<any> {
    return this.callAsyncSdkMethod("listDevices", {
      successEvenList: ['handpoint:deviceDiscoveryFinished'],
      timeout: 45000
    }, {
        connectionMethod: cordova.plugins.Handpoint.ConnectionMethod.BLUETOOTH
      });
  }

  setLogLevel(level: number): Promise<any> {
    return this.callAsyncSdkMethod("setLogLevel", {}, {
      level: level
    });
  }

  getPendingTransaction(): Promise<any> {
    return this.callAsyncSdkMethod("getPendingTransaction", {
      successEvenList: ['handpoint:pendingTransactionResult'],
      timeout: 45000
    }, {});
  }

  update(): Promise<any> {
    return this.callAsyncSdkMethod("update", {
      successEvenList: ['handpoint:connectionStatusChanged:Disconnected', 'handpoint:endOfTransaction']
    }, {});
  }

  getDeviceLogs(): Promise<any> {
    return this.callAsyncSdkMethod("getDeviceLogs", {
      successEvenList: ['handpoint:deviceLogsReady'],
      timeout: 45000
    }, {});
  }

  /**
   * This method transforms Callbacks into Promises
   * @param method Name of the SDK method to call
   * @param config
   *   config.timeout: timeout in seconds before rejecting the promise
   *   config.successEvenList: list of success event names 
   *   config.errorsEvenList: list of error event names 
   * @param params Object encapsulating the parameters of this method
   */
  private callAsyncSdkMethod(method: string, config: any, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.util.isCordova()) {
        if (params) {
          cordova.plugins.Handpoint[method](params, this.successCallback(config, resolve, reject).bind(this), (error) => {
            reject(error);
          });
        } else {
          cordova.plugins.Handpoint[method](this.successCallback(config, resolve, reject).bind(this), (error) => {
            reject(error);
          });
        }
      } else {
        resolve();
      }
    });
  }

  /**
   * Subscribes to success and error events and resolves the promise whether it receives an event 
   * or there is a timeout. Cleans up event subscriptions when it's done
   * @param config 
   *   config.timeout: timeout in seconds before rejecting the promise
   *   config.successEvenList: list of success event names 
   *   config.errorsEvenList: list of error event names 
   * @param resolve Resolve callback
   * @param reject Reject callback
   */
  private successCallback(config: any, resolve: any, reject: any): Function {
    var i, j;
    var resolved = false;
    // Need to listen for any event?
    if (config.successEvenList && config.successEvenList.length > 0) {
      // Success listener function
      var successListener = (res) => {
        resolved = true;
        // Unsusbcribe event listeners
        this.unsubscribe(successListener, errorListener, config.successEvenList, config.errorEvenList);
        resolve && resolve(res);
      };
      // Error listener function
      var errorListener = (err) => {
        resolved = true;
        // Unsusbcribe event listeners
        this.unsubscribe(successListener, errorListener, config.successEvenList, config.errorEvenList);
        reject && reject(err);
      };
      // Subscribe to all success events for this call
      for (i = 0; config.successEvenList && i < config.successEvenList.length; i++) {
        this.events.subscribe(config.successEvenList[i], successListener);
      }
      // Subscribe to all error events for this call
      for (j = 0; config.errorEvenList && j < config.errorEvenList.length; j++) {
        this.events.subscribe(config.errorEvenList[j], errorListener);
      }
    }

    return function(result) {
      if (config.successEvenList && config.successEvenList.length > 0) {
        // Set timeout functions if exists
        if (config.timeout) {
          setTimeout(() => {
            if (!resolved) {
              resolved = true;
              // Unsusbcribe event listeners
              this.unsubscribe(successListener, errorListener, config.successEvenList, config.errorEvenList);
              // Reject Promise because of timeout
              reject("Operation timeout");
            }
          }, config.timeout);
        }
      } else {
        resolve(result);
      }
    };
  }

  /**
   * Unsubscribes from a list of success and error events
   * @param successListener 
   * @param errorListener 
   * @param successEvenList 
   * @param errorEvenList 
   */
  private unsubscribe(successListener: Function, errorListener: Function, successEvenList: any[], errorEvenList: any[]): void {
    var i, j;
    // Unsubscribe to all success events for this call
    for (i = 0; successEvenList && i < successEvenList.length; i++) {
      this.events.unsubscribe(successEvenList[i], successListener);
    }
    // Unsubscribe to all error events for this call
    for (j = 0; errorEvenList && j < errorEvenList.length; j++) {
      this.events.unsubscribe(errorEvenList[j], errorListener);
    }
  }

}