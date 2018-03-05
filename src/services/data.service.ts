import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { CurrencyService } from './currency.service';

import { Events } from 'ionic-angular';

@Injectable()
export class DataService {

  private TRANSACTIONS_CACHE_SIZE: number = 12;
  public sharedSecret: string;
  public currency: any;

  constructor(
    public events: Events,
    public storage: Storage,
    public platform: Platform,
    public currencyService: CurrencyService) {

  }

  setCurrency(code: string) {
    // Save to local storage
    this.storage.set('currency', JSON.stringify(this.currencyService.get(code)));
  }

  getCurrency(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('currency').then((currency) => {
        if (currency) {
          resolve(JSON.parse(currency));
        } else {
          resolve(this.currencyService.get(this.currencyService.getDefaultCode()));
        }
      });
    });
  }

  setPreferredDevice(device: any) {
    // Save to local storage
    this.storage.set('device', JSON.stringify(device));
  }

  getPreferredDevice(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('device').then((device) => {
        if (device) {
          resolve(JSON.parse(device));
        } else {
          resolve(null);
        }
      });
    });
  }

  setListDevices(devices: any) {
    // Save to local storage
    this.storage.set('devices', JSON.stringify(devices));
  }

  getListDevices(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('devices').then((devices) => {
        if (devices) {
          resolve(JSON.parse(devices));
        } else {
          resolve([]);
        }
      });
    });
  }

  getTransactions(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.storage.get('transactions').then((transactions) => {
        if (transactions) {
          resolve(JSON.parse(transactions));
        } else {
          resolve([]);
        }
      });
    });
  }

  pushTransaction(transaction: any) {
    this.storage.get('transactions').then((transactions) => {
      let transactionsArray = [];
      if (transactions) {
        transactionsArray = JSON.parse(transactions);
      }
      transactionsArray.unshift(transaction);
      if (transactionsArray.length > this.TRANSACTIONS_CACHE_SIZE) {
        transactionsArray.pop();
      }
      this.storage.set('transactions', JSON.stringify(transactionsArray));
    });
  }

}