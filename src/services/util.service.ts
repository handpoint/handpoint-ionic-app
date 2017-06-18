import { Injectable } from '@angular/core';
import { ToastController, AlertController, Platform } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';

@Injectable()
export class UtilService {

  constructor(
    private _toast: Toast,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public platform: Platform) {
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  isIOS() {
    return this.platform.is('ios');
  }

  isAndroid() {
    return this.platform.is('android');
  }

  isMobile() {
    return this.isIOS() || this.isAndroid();
  }

  toast(msg: string, ms?: number) {
    let milliseconds = ms ? ms : 5000;

    if (this.isCordova()) {
      this._toast.show(msg, milliseconds.toString(), 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    } else {
      let toast = this.toastCtrl.create({
        message: msg,
        dismissOnPageChange: true,
        duration: milliseconds
      });
      toast.present();
    }
  }

  /**
   * Format a currency value
   * @param amount Amount in the minor unit of currency
   * @param decimals decimal places of the currency
   */
  formatCurrency(amount: string, decimals?: number) {
    var decimals = decimals || 0;

    if (amount.length < decimals) {
      // Left padding with zero
      amount = this.leftPadding(amount, decimals);
      amount = '.' + amount;
    } else if (amount.length > decimals) {
      // Insert decimal separator
      amount = amount.slice(0, amount.length - decimals) + "." + amount.slice(amount.length - decimals);
    } else {
      amount = amount || '0';
      amount = '.' + amount;
    }
    return amount;
  }

  /**
   * Complete n with required leading chars to complete specified length.
   * If no char is specified, use '0'
   * @param n 
   * @param length 
   * @param char 
   */
  leftPadding(n: string, length: number, char?: string) {
    var char = char || '0';
    var result = n;
    var i;

    for (i = n.length; i < length; i++) {
      result = char + result;
    }

    return result;
  };

}


