import { Component } from '@angular/core';

import { PaymentsPage } from '../payments/payments';
import { ConfigurationPage } from '../configuration/configuration';
import { PayPage } from '../pay/pay';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  pay = PayPage;
  payments = PaymentsPage;
  configuration = ConfigurationPage;

  constructor() {

  }
}
