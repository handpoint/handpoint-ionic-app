import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HandpointApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage'

import { PaymentsPage } from '../pages/payments/payments';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { PayPage } from '../pages/pay/pay';
import { TabsPage } from '../pages/tabs/tabs';
import { LogPage } from '../pages/log/log';
import { SearchDevicesPage } from '../pages/search-devices/search-devices';

import { UtilService } from '../services/util.service';
import { CurrencyService } from '../services/currency.service';
import { DataService } from '../services/data.service';
import { SdkService } from '../services/sdk.service';
import { PaymentService } from '../services/payment.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    HandpointApp,
    PaymentsPage,
    ConfigurationPage,
    PayPage,
    TabsPage,
    LogPage,
    SearchDevicesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HandpointApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HandpointApp,
    PaymentsPage,
    ConfigurationPage,
    PayPage,
    TabsPage,
    LogPage,
    SearchDevicesPage
  ],
  providers: [
    PaymentService,
    SdkService,
    DataService,
    CurrencyService,
    UtilService,
    StatusBar,
    SplashScreen,
    Toast,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
