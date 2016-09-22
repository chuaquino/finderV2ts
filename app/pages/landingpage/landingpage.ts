import {Component} from '@angular/core';
import {NavParams, NavController, AlertController} from 'ionic-angular';

import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

import {TranslatePipe} from "ng2-translate/ng2-translate";

import {MainPage} from '../main/main';



@Component({
  templateUrl: 'build/pages/landingpage/landingpage.html',
  pipes: [TranslatePipe]
})
export class LandingPage {

  // rootPage: any = HomePage;

  private geolocation: any = "";
  // public mainPage: any =  MainPage;

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private geolocationService: GeolocationService) {

  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter(");
    this.geolocationService.loadGeolocation();
  }

  autocomplete(searchbar){
    console.log(searchbar);
    this.geolocationService.autoComplete('landingpage');
    if(this.geolocation!==""){
      console.log("not null");
    }
  }

  showlatlong(event) {
    var me = this;
    var geoCoords: any = {};
    console.log("entered shwo latlong");

    document.getElementById('lndBtnLoc').style.display = "none";
    document.getElementById('lndLoaderLoc').style.display = "inline";

    console.log("geolocation working");

    var options = {maximumAge: 0, timeout: 5000, enableHighAccuracy:true};

    console.log(this.geolocation);
    console.log(this.navCtrl);

    navigator.geolocation.getCurrentPosition(

        (position) => {
            geoCoords.lat = position.coords.latitude;
            geoCoords.lng = position.coords.longitude;
            // this.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;

            var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(geoCoords);
             this.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
                // Log the value once it is resolved
             me.geolocation = locName;
             console.log(locName);

             geoCoords.locationName = locName;

             if (locName!==undefined) {
               document.getElementById('lndBtnLoc').style.display = "inline";
               document.getElementById('lndLoaderLoc').style.display = "none";
               console.log(me.navCtrl);
               console.log(geoCoords);
               setTimeout(function() {

                 me.navCtrl.push(MainPage, { geoloc: geoCoords });

               }, 2000);
             }


            });
        },

        (error) => {
          switch(error.code)
          {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          // case error.UNKNOWN_ERROR:
          //   console.log("An unknown error occurred.");
          //   break;
          }
            console.log(error.code);
            this.locErrMsg();
        }, options);

  }

  locErrMsg(){
    // var me = this;
    this.geolocationService.locErrMsg();
    document.getElementById('lndBtnLoc').style.display = "inline";
    document.getElementById('lndLoaderLoc').style.display = "none";
  }


}
