import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html'
})
export class PaymentsPage {

  public payments: any[] = [];

  constructor(
    private _ngZone: NgZone,
    public navCtrl: NavController,
    public paymentService: PaymentService,
    public platform: Platform) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.paymentService.initDB();
      this.paymentService.mockData(30);
      // Fetch first page
      this.loadMore();
    });
  }

  loadMore(infiniteScroll?: any) {
    this.paymentService.fetchNextPage().then((payments) => {
      this._ngZone.run(() => {
        this.payments = payments;
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
    });
  }

}
