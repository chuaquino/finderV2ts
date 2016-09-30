import {NavController,AlertController, ToastController} from 'ionic-angular';
import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {TranslateService} from "ng2-translate/ng2-translate";


import {Geolocation} from 'ionic-native';

declare var google;

@Injectable()
export class GeolocationService {

  apiKey: any = 'AIzaSyD4zGo9cejtd83MbUFQL8YU71b8_A5XZpc';
  map: any;
  mapInitialised: boolean = false;
  latlng: any = {};
  // mainPage:any  = MainPage;

  constructor( private alertCtrl: AlertController, private toastCtrl: ToastController, private connectivity: ConnectivityService, private translate: TranslateService) {

  }

  loadGeolocation(){
    console.log("loadGeolocation(){");

    this.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");


        if(this.connectivity.isOnline()){
            console.log("online, loading map");

            let script = document.createElement("script");
            script.id = "geoLocation";
            script.src = 'https://maps.googleapis.com/maps/api/js?key='+this.apiKey+'&libraries=places,geometry';
            console.log('online');


            document.body.appendChild(script);

        }
        else {

          setTimeout(function() {
            console.log("offline, loading map");
            // this.netErrMsg();
            console.log('a1');
          }, 3000);
        }
    }
    else {

        if(this.connectivity.isOnline()){
            console.log("showing map");
            // return this.initMap(ctr);
            // this.enableMap();
        }
        else {
            console.log("disabling map");
            // this.netErrMsg();
            console.log('a2');



            // add error handler if offline -- alert box
        }

    }
  }
  // getPlaces function Here
  getPlaces(pageDetails, callback){
    console.log(pageDetails);

  var loc = {lat: parseFloat(pageDetails.geoloc.lat), lng: parseFloat(pageDetails.geoloc.lng)};

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 17
    });

    var type,keyword;
    console.log('enter');
    type = pageDetails.placeType;
    keyword = pageDetails.cuisine;

    var distance = new google.maps.places.PlacesService(this.map);
    distance.nearbySearch({
      location: loc,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: [type],
      keyword: [keyword]
    }, callback);
    console.log('distance');
  }

  setPlaces(pageDetails){

    var items: number[] = [];
    var a = 1;
    var p1 = new google.maps.LatLng(pageDetails.geoloc.lat, pageDetails.geoloc.lng);

    var str1,str2;

    this.getPlaces(pageDetails, function(result,status, pagination){
      console.log(pageDetails.geoloc.lat);
      console.log(pageDetails.geoloc.lng);
        // items =  result;
        // if (status === google.maps.places.PlacesServiceStatus.OK) {
          // if (pagination.hasNextPage) {
            console.log(a);
            a++;
            console.log(result);
            console.log("1aa");
            pagination.nextPage();
            for (var m = 0; m < result.length; m++) {
              result[m]['distance']= (google.maps.geometry.spherical.computeDistanceBetween(p1, result[m].geometry.location) / 1000).toFixed(2)+" km";
              items.push(result[m]);
              if (result[m].rating===undefined) {
                result[m].rating = 0;
              }

              for (var i = 0; i < result[m].types.length; i++) {
                str1 = result[m].types[i];
                str2 = str1.replace(/_/g, ' ');
                result[m].types[i] = str2;
              }

            }
          // }
        // }

    });


    return new Promise(function(resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function() {
        console.log(items);
        console.log("2aa");
        resolve(items); // After 3 seconds, resolve the promise with value 42
      }, 2500);
    });

  }
  //
  //
  setLocationName(ctr){

    var geo: any;

    if(typeof google == "undefined" || typeof google.maps == "undefined"){
      //
      if(this.connectivity.isOnline()){
        this.getLocationName(ctr, function(result){
          console.log(result);
            geo =  result;
        });
      }
      else {
        this.netErrMsg();
      }
    }
    else {

      if(this.connectivity.isOnline()){
        this.getLocationName(ctr, function(result){
          console.log(result);
            geo =  result;
        });
      }
      else {
        this.netErrMsg();
      }


    }

    return new Promise(function(resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function() {
        console.log(geo);
        // if (geo===undefined) {
        //   this.netErrMsg();
        // }else {
          resolve(geo); // After 3 seconds, resolve the promise with value 42
        // }
      }, 3000);
    });



  }

  // //listener when online or offline
  addConnectivityListeners(){


    // var lastStatus = "disconnected";

    let onOnline = () => {
      console.log("ONLINE");
      // if(lastStatus == 'disconnected') {
        // lastStatus = 'connected';
        // console.log(lastStatus);

        setTimeout(() => {
            if(typeof google == "undefined" || typeof google.maps == "undefined"){
                this.loadGeolocation();
            } else {

            }
        }, 2000);
      // }

    };



    let onOffline = () => {

      // setTimeout(() => {
      // if(lastStatus == 'connected') {
        console.log('OFFLINE');
        // console.log(lastStatus);
        // lastStatus = 'disconnected';
        // console.log(lastStatus);
        console.log('a3');
        // this.netErrMsg();

      // }
      // else if (lastStatus == "") {
      //   console.log('a4');
      //   console.log('status blank');
      //   this.netErrMsg();
      // }
      // }, 2000);

      // this.translate.get(data.res.rows.item(i).text).subscribe((res: string) => {
      //     this.points.push(res);
      // });

      this.translate.get('Looks like there is a problem with your network connection. Try again later.').subscribe((res: string) => {
        let toast = this.toastCtrl.create({
          message: res,
          duration: 5000,
          position: 'bottom'
        });
        toast.present();

      });

    };


    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }
  //
  getLocationName(ctr, callback) {
      var input = ctr;
      var latlngStr = input.split(',', 2);

      var locationName;
      var geocoder = new google.maps.Geocoder();
      var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

      // Reverse Geocoding using google maps api.
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                console.log(results[1].address_components[0].types[0]);
                console.log(results[1]);

                var locString = [];
                var locString2;

                for (var i = 0; i < results[1].address_components.length; i++) {

                  if (results[1].address_components[i].types[0]!='administrative_area_level_2') {
                    locString.push(results[1].address_components[i].long_name);
                  }
                  locString2 = locString.join(', ');
                }
                locationName = locString2;
              }
              else {
                  locationName = "Unknown";
              }
          }
          else {
              locationName = "";
          }
          callback(locationName);
      });
  }

  autoComplete(ctr){
    var me = this;
    console.log('lll');


    // console.log(document.getElementById('geo'));
    // console.log(new google.maps.places);
    var input;
    if (ctr =='landingpage') {
      console.log('land');
      input = document.getElementById('geolocation').getElementsByTagName('input')[0];
    }
    else if (ctr =='mainpage') {
      console.log('main');
      input = document.getElementById('geolocation2').getElementsByTagName('input')[0];
    }

    // console.log(new google.maps.places.Autocomplete(document.getElementById('geo')));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      me.latlng.lat = place.geometry.location.lat();
      me.latlng.lng = place.geometry.location.lng();

      var autolocString = [];
      var autolocString2;
      console.log(place);

      for (var i = 0; i < place.address_components.length; i++) {

        if (place.address_components[i].types[0]!='administrative_area_level_2') {
          autolocString.push(place.address_components[i].long_name);
        }
        autolocString2 = autolocString.join(', ');
      }
      me.latlng.locationName = autolocString2;
      console.log(me.latlng.locationName);
      console.log(me.latlng.lat);

      if (ctr == 'landingpage') {
        // me.nav.push(MainPage, { geoloc: me.latlng });
      }

    });


  }


  // Location Map
  getPolHosp(detail,page){
    console.log(detail);
    console.log(page);

    var img;


    var mapOptions = {
        center: detail.geometry.location,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    }

    console.log("Get Hospital Lat Working");
    console.log(page);
    console.log('afa');

    console.log(page === 'supmarket');
    // console.log(document.getElementById('police_map'));
    console.log(detail);

    if (page === 'hospitals') {
      console.log('entered if');
      // mapcoords = {lat: parseFloat(detail.lat), lng: parseFloat(detail.lng)};
      // img = 'img/pins/hospital.png';
      // mapElem = document.getElementById('hospital_map');
      console.log('Entered hospital map');
      img = 'img/pins/hospital.png';
      // this.map = new google.maps.Map(document.getElementById('hospital_map'), mapOptions );
    }
    else if (page === 'resto') {
      console.log('Entered Resto map');
      img = 'img/pins/restaurant.png';
      // this.map = new google.maps.Map(document.getElementById('resto_map'), mapOptions );

    }
    else if (page === 'hotels') {
      console.log('Entered Hotel map');
      img = 'img/pins/hotel.png';
      // this.map = new google.maps.Map(document.getElementById('hotel_map'), mapOptions );

    }
    else if (page === 'malls') {
      console.log('Entered Mall map');
      img = 'img/pins/mall.png';
      // this.map = new google.maps.Map(document.getElementById('mall_map'), mapOptions );

    }
    else if (page === 'supermarkets') {
      console.log('Entered Supermarket map');
      img = 'img/pins/supermarket.png';
      // this.map = new google.maps.Map(document.getElementById('supmarket_map'), mapOptions );
    }
    else if (page === 'salons') {
      console.log('Entered salon map');
      img = 'img/pins/salon.png';
      // this.map = new google.maps.Map(document.getElementById('salon_map'), mapOptions );

    }
    else {
      // mapcoords = {lat: parseFloat(detail.lat), lng: parseFloat(detail.lng)};
      // img = 'img/pins/police.png';
      // mapElem = document.getElementById('police_map');
      console.log('Entered police map');
      img = 'img/pins/police.png';
      // this.map = new google.maps.Map(document.getElementById('police_map'), mapOptions );
    }

    this.map = new google.maps.Map(document.getElementById('uni_map'), mapOptions );


    var image = {
      url: img,
      scaledSize: new google.maps.Size(23, 36)
    };

    var contentString = '<h4 class="pol_name">'+detail.name+'</h4><span class="pol_address">'+detail.vicinity+'</span>';

    if (detail.photos!==undefined) {
      var place_ph = detail.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 300});
      contentString=contentString+'<br/><img src="'+place_ph+'"/>';
    }

    var infowindow = new google.maps.InfoWindow({
     content: contentString
    });


    var marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: detail.geometry.location,
      icon: image
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });


  }

  setPlaceDetails(mapElem,id){

    var items: number[] = [];
    var params: any = {};
    params.mapElem = mapElem;
    params.id= id;
    console.log(id);

    this.getPlaceDetails(params, function(place, status) {
      console.log(place);

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('OK');
        console.log(place.reviews);
        // console.log(place.icon);

        if (place.reviews !== undefined){
          for (var i = 0; i < place.reviews.length; i++) {
            if (navigator.language=='ja-JP') {
              place.reviews[i].newTime = new Date(place.reviews[i].time*1000).toLocaleDateString('ja-JP');
            }
            else {
              place.reviews[i].newTime = new Date(place.reviews[i].time*1000).toLocaleDateString('en-US');
            }
          }
        }
        else {
          console.log("Place selected has no reviews.");
        }
        items.push(place);
      }

    });


    return new Promise(function(resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function() {
        console.log(items);
        console.log('itemu');
        resolve(items); // After 3 seconds, resolve the promise with value 42
      }, 500);
    });
  }

  getPlaceDetails(params, callback){

    console.log(params);
    console.log('getPlaceDetails');
    // console.log('enter getPlaceDetails');
    // console.log(mapElem);
    // console.log(id);
    //
    var map = new google.maps.Map(document.getElementById(params.mapElem), {
      center: {lat: -33.866, lng: 151.196},
      zoom: 15
    });
    //
    var service = new google.maps.places.PlacesService(map);
    //
    // console.log(service);
    //
    service.getDetails({
      placeId: params.id
    }, callback);


    // console.log(pageDetails);

    // var loc = {lat: parseFloat(pageDetails.geoloc.lat), lng: parseFloat(pageDetails.geoloc.lng)};
    //
    // this.map = new google.maps.Map(document.getElementById('map'), {
    //   center: loc,
    //   zoom: 17
    // });

    // var type,keyword;
    // console.log('enter');
    // type = pageDetails.placeType;
    // keyword = pageDetails.cuisine;
    //
    // var distance = new google.maps.places.PlacesService(map);
    // distance.nearbySearch({
    //   location: loc,
    //   rankBy: google.maps.places.RankBy.DISTANCE,
    //   type: [type],
    //   keyword: [keyword]
    // }, callback);
  }


  getLatlng(){

    console.log(this.latlng);
    return this.latlng;
  }

  netErrMsg(){

    console.log("disable map");
    let alert = this.alertCtrl.create({
      title: 'No connection',
      subTitle: 'Looks like there is a problem with your network connection. Try again later.',
      buttons: ['OK']
    });

    alert.present();


  }

  locErrMsg(){

    let alert = this.alertCtrl.create({
      title: 'No location found',
      subTitle: 'Please enable your GPS location.',
      buttons: ['OK']
    });
    alert.present();
  }



}
