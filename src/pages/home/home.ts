import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public message: String;

  constructor(public navCtrl: NavController, platform: Platform) {
    var that = this;

    that.message = 'Loading…';
    if (platform.is('cordova') && cordova !== undefined && cordova !== null) {
      that.message = 'Loading… (Cordova available)';
      try {
        cordova.exec(
          function (result) {
            // TODO success
            that.message = result;
          },
          function (error) {
            // TODO error
            that.message = 'Error running plugin ' + error;
          },
          'HandpointApiCordova',
          'sale',
          ['1']
        );
      } catch (ex) {
        that.message = 'Exception';
      }
    } else {
      that.echoMessage = 'Plugin is not available on Browser platform';
    }
  }

}
