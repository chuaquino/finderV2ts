import {Component} from '@angular/core';
import {NavParams, Storage, SqlStorage, NavController} from 'ionic-angular';
import {DataService} from '../../../providers/data-service/data-service';
import {ConnectivityService} from '../../../providers/connectivity-service/connectivity-service';
import {GoogleMapsService} from '../../../providers/google-maps-service/google-maps-service';
import {LoadingModal} from '../../../components/loading-modal/loading-modal';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
  templateUrl: 'build/pages/jeepney/jeep-routes/jeep.map.html',
  pipes: [TranslatePipe]
  ,
  directives: [LoadingModal],
  providers: [GoogleMapsService]
})

export class JeepMapsPage {

  private jeep: any;
  private option: any;
  private points: any;

  constructor(private dataService: DataService, private navParams: NavParams, private navCtrl: NavController, private http: Http, private connectivity: ConnectivityService, private googleMapsService: GoogleMapsService){

    this.jeep= this.navParams.get('jeep');

    console.log(this.jeep[0]);

    this.option = {};
    this.points = [];

    this.dataService.getPoints().then((data) => {
      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) {


          if (this.check_marks(data.res.rows.item(i).tags,this.jeep.name)) {
            this.points.push({text: data.res.rows.item(i).text, lat: data.res.rows.item(i).lat, lng:data.res.rows.item(i).lng, tags:data.res.rows.item(i).tags, icon:data.res.rows.item(i).icon});
          }
        }
      }

    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });

    this.option.jeep_1 = this.jeep;
    this.option.marker_1 = this.points;

    this.googleMapsService.loadGoogleMaps(this.option);
  }

  check_marks(tags,name){
    console.log('mappu'+document.getElementById('map'));



    var stringTags = tags;
    var index = stringTags.split(",");

    if (index.indexOf(name)!=-1) {
      return true;
    }
  }
}
