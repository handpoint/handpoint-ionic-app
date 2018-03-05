import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
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

  public currency: string;
  private currencyCode: number = 826;
  public currencyFractionSize: number;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public util: UtilService,
    public data: DataService,
    public currencyService: CurrencyService,
    public sdk: SdkService,
    public vibration: Vibration,
    public loadingCtrl: LoadingController,
    public platform: Platform) {
    this.currency = this.currencyService.getDefaultCode();
    this.currencyFractionSize = this.currencyService.getDefault().fractionSize;
    this.currencyCode = this.currencyService.getDefault().numCode;
  }

  ionViewWillEnter() {
    this.data.getCurrency().then((currency) => {
      this.currency = currency.code;
      this.currencyFractionSize = currency.fractionSize;
      this.currencyCode = currency.numCode;
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
    this.sdk.sale(parseInt(this.amount), this.currencyCode).then((result) => {
      this.util.toast("Sale finished");
      this.finish(result);
    }, (error) => {
      this.util.toast("Sale not completed");
      this.finish();
    });
  }

  refund() {
    this.sdk.refund(parseInt(this.amount), this.currencyCode).then((result) => {
      this.util.toast("Refund finished");
      this.finish(result);
    }, (error) => {
      this.util.toast("Refund not completed");
      this.finish();
    });
  }

  finish(result?: any) {
    this.vibration.vibrate(1000);
    if (result) {
      this.data.pushTransaction({
        type: this.mode,
        amount: parseInt(this.amount),
        amountFormatted: this.amountFormatted,
        currency: this.currency,
        currencyCode: this.currencyCode,
        currencyFractionSize: this.currencyFractionSize,
        date: new Date(),
        eFTTransactionID: result.transactionResult.eFTTransactionID
      });
    }
    this.amount = '0';
    this.amountFormatted = this.util.formatCurrency(this.amount, this.currencyFractionSize);
  }

}
