import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { CurrencyService } from './currency.service';

import { Events } from 'ionic-angular';

@Injectable()
export class DataService {

  public sharedSecret: string;
  public currency: any;

  constructor(
    public events: Events,
    public storage: Storage,
    public platform: Platform,
    public currencyService: CurrencyService) {
    this.platform.ready().then(() => {
      this.init();
    });
  }

  init() {
    this.storage.ready().then(() => {
      // Get shared secret from storage
      var sharedSecretPromise = this.getSharedSecretFromLocalStorage();
      // Get currency from storage
      var currencyPromise = this.getCurrencyFromLocalStorage();
      // Wait for both
      Promise.all([sharedSecretPromise, currencyPromise]).then(() => {
        this.events.publish('data.service:ready');
      });
    });
  }

  setCurrency(code?: string) {
    let currencyObj;

    if (code) {
      currencyObj = this.currencyService.get(code);
      currencyObj.code = code;
    } else {
      currencyObj = this.currencyService.getDefault();
      currencyObj.code = this.currencyService.getDefaultCode();
    }

    if (currencyObj) {
      // Save to local storage
      this.storage.set('currency', currencyObj);
    } else {
      console.error('No currency found ', code);
    }

  }

  set(key: string, value: any) {
    this[key] = value; // Save component attribute  
    this.storage.set(key, value); // Save in local storage
  }

  getSharedSecretFromLocalStorage() {
    return new Promise((resolve, reject) => {
      this.storage.get('sharedSecret').then((sharedSecret) => {
        if (sharedSecret) {
          this.sharedSecret = sharedSecret;
        } else {
          // TODO remove this else (it is for testing purposes only)
          this.sharedSecret = '0102030405060708091011121314151617181920212223242526272829303132';
        }
        resolve();
      });
    });
  }

  getCurrencyFromLocalStorage() {
    return new Promise((resolve, reject) => {
      this.storage.get('currency').then((currency) => {
        if (currency) {
          // Parse json object
          if (typeof this.currency === 'string') {
            try {
              this.currency = JSON.parse(currency);
            } catch (e) {
              console.error('Error parsing currency JSON: ', currency);
            }
          } else {
            this.currency = currency;
          }
        } else {
          // If no currency selected, set default
          this.setCurrency();
        }
        resolve();
      });
    });
  }

}