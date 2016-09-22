import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {JeepMapsPage} from '../../jeepney/jeep-routes/jeep.map';
import {DataService} from '../../../providers/data-service/data-service';

@Component({
  templateUrl: 'build/pages/jeepney/jeep-routes/jeep.details.html'
})

export class JeepDetailsPage {

  private details: any;
  private jeepDetails: any;

  constructor(private dataService: DataService, private navParams: NavParams, private navCtrl: NavController){
    this.details = navParams.get('jeep');

    console.log(this.details.name);
    console.log('should enter data service');

    this.jeepDetails = [];

    this.dataService.getJeepDetails(this.details.name).then((data) => {
      // console.log(data.result);
      console.log(data.res.rows[0]);
      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) { console.log(data.res.rows.item(i));
          this.jeepDetails.push({name: data.res.rows.item(i).name, color: data.res.rows.item(i).color, image:data.res.rows.item(i).image, route:data.res.rows.item(i).route, route2:data.res.rows.item(i).route2,coordi:data.res.rows.item(i).coordi});
       }
      }
      console.log(this.jeepDetails);
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });
  }

  presentModal() {
    console.log('present modal');
    console.log(this.jeepDetails[0] );
    this.navCtrl.push(JeepMapsPage, { jeep: this.jeepDetails[0] });
  }
}
