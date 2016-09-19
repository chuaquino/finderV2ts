import {Injectable} from '@angular/core';
import {Network} from 'ionic-native';
import {Platform} from 'ionic-angular';

declare var Connection;

@Injectable()
export class ConnectivityService {

  onDevice: boolean;

  constructor(public platform: Platform){
    console.log("connectivityService");
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if(this.onDevice && Network.connection){
      console.log(Network.connection !== Connection.NONE);
      return Network.connection !== Connection.NONE;
    } else {
      console.log(navigator.onLine);
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice && Network.connection){
      return Network.connection === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}
