import {Component} from '@angular/core';
import {NavParams, NavController, AlertController} from 'ionic-angular';

import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
// import {MainPage} from '../main/main';
// import {TranslatePipe} from '../../pipes/translate';


@Component({
  templateUrl: 'build/pages/landingpage/landingpage.html',
  providers: [GeolocationService]
})
export class LandingPage {

  // rootPage: any = HomePage;

  // mainPage: any = MainPage;
  geolocation: String = '';

  constructor(private navCtrl: NavController, navParams: NavParams, alertCtrl: AlertController, private geolocationService: GeolocationService) {

  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter(")
    this.geolocationService.loadGeolocation();
  }

  autocomplete(searchbar){
    // this.geolocationService.autoComplete('landingpage');
  }

  showlatlong(event) {
    // var me = this;
    // var geoCoords = {};
    // console.log("entered shwo latlong");
    //
    // document.getElementById('lndBtnLoc').style.display = "none";
    // document.getElementById('lndLoaderLoc').style.display = "inline";
    //
    // console.log("geolocation working");
    //
    // var options = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true};
    //
    // navigator.geolocation.getCurrentPosition(
    //
    //     (position) => {
    //         geoCoords.lat = position.coords.latitude;
    //         geoCoords.lng = position.coords.longitude;
    //         // this.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;
    //
    //         var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
    //         console.log(geoCoords);
    //          this.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
    //             // Log the value once it is resolved
    //          this.geolocation = locName;
    //
    //          geoCoords.locationName = locName;
    //
    //          if (locName!==undefined) {
    //            setTimeout(function() {
    //              this.navCtrl.push(MainPage, { geoloc: geoCoords });
    //            }, 2000);
    //            console.log(this.geolocation);
    //          }
    //
    //
    //         });
    //     },
    //
    //     (error) => {
    //       switch(error.code)
    //       {
    //       case error.PERMISSION_DENIED:
    //         console.log("User denied the request for Geolocation.");
    //         break;
    //       case error.POSITION_UNAVAILABLE:
    //         console.log("Location information is unavailable.");
    //         break;
    //       case error.TIMEOUT:
    //         console.log("The request to get user location timed out.");
    //         break;
    //       case error.UNKNOWN_ERROR:
    //         console.log("An unknown error occurred.");
    //         break;
    //       }
    //         console.log(error.code);
    //         this.locErrMsg();
    //     }, options);

  }

  locErrMsg(){
    // var me = this;
    // this.geolocationService.locErrMsg();
    // document.getElementById('lndBtnLoc').style.display = "inline";
    // document.getElementById('lndLoaderLoc').style.display = "none";
  }


}
