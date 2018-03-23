import { Component, NgZone } from '@angular/core';
import { Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SdkService } from '../services/sdk.service';
import { Storage } from '@ionic/storage';
import { DataService } from '../services/data.service';
import { UtilService } from '../services/util.service';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchDevicesPage } from '../pages/search-devices/search-devices';

@Component({
  templateUrl: 'app.html'
})
export class HandpointApp {
  rootPage: any = TabsPage;

  public HANDPOINT_DEVICE_PREFIX: string = "68:AA";

  constructor(
    private _ngZone: NgZone,
    public platform: Platform,
    public events: Events,
    public statusBar: StatusBar,
    public sdk: SdkService,
    public data: DataService,
    public util: UtilService,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen) {
    // Wait for plugins to be initialized
    this.platform.ready().then(() => {
      this.storage.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        this.init();
      });
    });
  }

  init() {
    // Configure statusbar
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#1b0e33');
    this.statusBar.styleLightContent();
    this.splashScreen.hide();

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    // Init Handpoint SDK 
    this.sdk.setup().then(() => {
      // set shared secret
      this.sdk.setSharedSecret('0102030405060708091011121314151617181920212223242526272829303132').then(() => {
        setTimeout(() => {
          // Connect to preferred device
          this.data.getPreferredDevice().then((device) => {
            if (device) {
              this.sdk.connect(device).then(() => {
                loading.dismiss();
              }, (err) => {
                loading.dismiss();
              });
            } else {
              loading.dismiss();
              this.rootPage = SearchDevicesPage;
            }
          }, (error) => {
            loading.dismiss();
          });
        }, 2000);
      });
    });

    // On disconnect go to connect to device page
    this.events.subscribe('handpoint:connectionStatusChanged:Disconnected', () => {
      this.util.toast("Please connect to a device");
      if (this.rootPage != SearchDevicesPage) {
        this.rootPage = SearchDevicesPage;
      }
    });

  }

}
