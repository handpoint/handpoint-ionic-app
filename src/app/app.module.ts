import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PaymentsPage } from '../pages/payments/payments';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { PayPage } from '../pages/pay/pay';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchDevicesPage } from '../pages/search-devices/search-devices';

import { UtilService } from '../services/util.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    PaymentsPage,
    ConfigurationPage,
    PayPage,
    TabsPage,
    SearchDevicesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PaymentsPage,
    ConfigurationPage,
    PayPage,
    TabsPage,
    SearchDevicesPage
  ],
  providers: [
    UtilService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
