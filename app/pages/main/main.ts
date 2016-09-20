import {Component} from '@angular/core';
import {Storage, SqlStorage, NavParams, NavController,AlertController} from 'ionic-angular';
// import {TabsPage} from '../jeepney/tabs/tabs';
//
//
// import {UniPage} from '../uni-page/uni-page';
// // Import menu pages until here
// import {DataService} from '../../services/data';
// // import {Geolocation} from 'ionic-native';
//
import {GoogleMapsService} from '../../providers/google-maps-service/google-maps-service';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
//
//
// import {TranslatePipe} from '../../pipes/translate';

@Component({
  templateUrl: 'build/pages/main/main.html'
  // // ,
  // providers: [GeolocationService],
  // pipes: [TranslatePipe]

})

export class MainPage{
  // static get parameters(){
  //   return [[DataService],[GeolocationService],[NavParams],[NavController],[AlertController],[ConnectivityService]];
  // }

  private geolocation2: any = "";

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private geolocationService: GeolocationService) {

  }
  ionViewWillEnter(){
    var me = this;
    var details = this.navParams.get('geoloc');
    console.log(details);

    me.geolocation2 = details.locationName;
  }

  // ionViewDidEnter(){
  //   // setTimeout(function() {
  //     document.getElementById("lowerDiv").style.display = "inline";
  //
  //   // },600);
  //
  // }
  //
  autocomplete(searchbar){
    console.log(searchbar.value);
    this.geolocationService.autoComplete('mainpage');
  }
  //
  showlatlong2(event) {
    var me = this;
    var geoCoords: any = {};
    console.log("entered shwolatlong2");
    //
    document.getElementById('mainBtnLoc').style.display = "none";
    document.getElementById('mainLoaderLoc').style.display = "inline";
    //
    console.log("geolocation working");
    //
    var options = {maximumAge: 0, timeout: 5000, enableHighAccuracy:true};
    navigator.geolocation.getCurrentPosition(

        (position) => {
            geoCoords.lat = position.coords.latitude;
            geoCoords.lng = position.coords.longitude;
            // this.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;

            var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(geoCoords);
             this.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
                // Log the value once it is resolved
             me.geolocation2 = locName;
             console.log(locName);

             if (me.geolocation2!==null) {
               document.getElementById('mainBtnLoc').style.display = "inline";
               document.getElementById('mainLoaderLoc').style.display = "none";
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
  //
  locErrMsg(){
    var me = this;
    me.geolocationService.locErrMsg();
    document.getElementById('mainBtnLoc').style.display = "inline";
    document.getElementById('mainLoaderLoc').style.display = "none";
  }
  //
  // nextPage(ctr){
  //   console.log('nextPage(ctr)');
  //   var ctr;
  //   var me = this;
  //   var latlng = me.geolocationService.getLatlng();
  //   console.log(me.details.locationName);
  //   console.log(latlng.locationName);
  //   //push another page onto the history stack
  //   //causing the nav controller to animate the new page in
  //
  //   var geoloc;
  //
  //   if (latlng.locationName!=undefined) {
  //     console.log('aaaaaaaa');
  //     geoloc = latlng;
  //
  //   }
  //   else{
  //     console.log('bbbbbb');
  //     geoloc = me.details;
  //     console.log(geoloc);
  //   }
  //
  //   if(me.connectivity.isOnline()){
  //     this.nav.push( UniPage, {geoloc: geoloc, page:ctr} );
  //   }
  //   else {
  //       me.geolocationService.netErrMsg();
  //   }
  // }

}
