import { Component } from '@angular/core';

import { SdkService } from '../../services/sdk.service';

declare var cordova;

@Component({
  selector: 'page-log',
  templateUrl: 'log.html'
})
export class LogPage {

  constructor(public sdk: SdkService) {
  }

}
