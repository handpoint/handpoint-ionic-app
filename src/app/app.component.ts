import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SdkService } from '../services/sdk.service';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class HandpointApp {
  rootPage: any = TabsPage;

  constructor(
    private _ngZone: NgZone,
    platform: Platform,
    public statusBar: StatusBar,
    public sdk: SdkService,
    public splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.init();
    });
  }

  init() {
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    // override window scope handler to run handler defined on this component
    (window as any).handleOpenURL = (url: string) => {
      setTimeout(() => {
        this._ngZone.run(() => {
          this.handleOpenUrl(url);
        });
      }, 0);
    };

    // check if app was opened by custom url handpoint://
    const lastUrl: string = (window as any).lastHandleOpenURL || "";
    if (lastUrl && lastUrl !== "") {
      delete (window as any).lastHandleOpenURL;
      this.handleOpenUrl(lastUrl);
    }
  }

  private handleOpenUrl(url: string) {
    var parts = url.split("://");
    var route = parts[1].split("/");
    var action = route[0];
    var param = route[1];

    if (action === 'shared-secret') {
      // Set new shared secret
      this.sdk.setSharedSecret(param);
    }
  }

}
