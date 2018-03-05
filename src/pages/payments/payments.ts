import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { SdkService } from '../../services/sdk.service';
import { UtilService } from '../../services/util.service';
import { CurrencyService } from '../../services/currency.service';
import { ActionSheetController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html'
})
export class PaymentsPage {

  public transactions: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public vibration: Vibration,
    public sdk: SdkService,
    public util: UtilService,
    public currencyService: CurrencyService,
    public loadingCtrl: LoadingController,
    public data: DataService) {

  }

  ionViewWillEnter() {
    this.data.getTransactions().then((transactions) => {
      this.transactions = transactions;
    });
  }

  getType(type: string): string {
    if (type == 'pay') {
      return 'Payment';
    } else if (type == 'refund') {
      return 'Refund';
    } else if (type == 'pay_reversal') {
      return 'Payment reversal';
    } else if (type == 'refund_reversal') {
      return 'Refund reversal';
    }
  }

  txnActionSheet(txn: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.getType(txn.type) + " actions",
      buttons: [
        {
          text: 'Reversal',
          role: 'reversal',
          handler: () => {
            this.finish(txn);
          }
        }
      ]
    });

    if (txn.type == 'pay' || txn.type == 'refund') {
      actionSheet.present();
    }

  }

  finish(txn: any) {
    this.data.getCurrency().then((currency) => {
      let transaction = null;
      transaction = {
        amount: "" + txn.amount,
        amountFormatted: this.util.formatCurrency("" + -txn.amount, currency.fractionSize),
        currency: currency.code,
        currencyCode: currency.numCode,
        currencyFractionSize: currency.fractionSize,
        date: new Date()
      };

      let loading = this.loadingCtrl.create({
        content: 'Processing reversal...'
      });
      loading.present();

      if (txn.type == 'pay') {
        this.sdk.saleReversal(txn.amount, txn.currencyCode, txn.eFTTransactionID).then(() => {
          this.util.toast("Sale reversal succeed");
          this.vibration.vibrate(1000);
          // Save transaction in local storage and add it to the beginning of the list
          transaction.type = 'pay_reversal';
          this.data.pushTransaction(transaction);
          this.transactions.unshift(transaction);
          loading.dismiss();
        }, (err) => {
          this.util.toast("Sale reversal error");
          loading.dismiss();
        });
      } else if (txn.type == 'refund') {
        this.sdk.refundReversal(txn.amount, txn.currencyCode, txn.eFTTransactionID).then(() => {
          this.util.toast("Refund reversal succeed");
          this.vibration.vibrate(1000);
          // Save transaction in local storage and add it to the beginning of the list
          transaction.type = 'refund_reversal';
          this.data.pushTransaction(transaction);
          this.transactions.unshift(transaction);
          loading.dismiss();
        }, (err) => {
          this.util.toast("Refund reversal error");
          loading.dismiss();
        });
      } else {
        loading.dismiss();
      }
    });

  }

}
