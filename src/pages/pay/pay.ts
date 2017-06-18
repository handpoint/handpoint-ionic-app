import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UtilService } from '../../services/util.service';
import { DataService } from '../../services/data.service';
import { CurrencyService } from '../../services/currency.service';
import { SdkService } from '../../services/sdk.service';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})
export class PayPage {

  public mode: string = 'pay';
  private amount: string = '0';
  private amountFormatted: string = '0';
  public saleParams: any = {
    amount: 0,
    currency: 826
  };
  public currency: string;
  public currencyFractionSize: number;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public util: UtilService,
    public data: DataService,
    public currencyService: CurrencyService,
    public sdk: SdkService,
    public loadingCtrl: LoadingController,
    public platform: Platform) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.currency = this.currencyService.getDefaultCode();
    this.currencyFractionSize = this.currencyService.getDefault().fractionSize;
    this.saleParams.currency = this.currencyService.getDefault().numCode;
    this.sdk.init().then(() => {
      loading.dismiss();
    });
  }

  ionViewWillEnter() {
    this.data.getCurrencyFromLocalStorage().then(() => {
      this.currency = this.data.currency.code;
      this.currencyFractionSize = this.data.currency.fractionSize;
      this.saleParams.currency = this.data.currency.numCode;
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

  sale() {
    var that = this;

    that.saleParams.amount = parseInt(that.amount);
    that.sdk.call('sale', function (result) {
      // TODO waiting for card
    }, that.saleParams);
  }

  refund() {
    var that = this;

    that.saleParams.amount = parseInt(that.amount);
    this.sdk.call('refund', function (result) {
      // TODO waiting for card
    }, this.saleParams);
  }

}
