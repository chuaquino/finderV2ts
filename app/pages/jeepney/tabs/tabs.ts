import {Component} from '@angular/core';
import {JeepRoutesPage} from '../../jeepney/jeep-routes/jeep.view';
import {FindRoutesPage} from '../../jeepney/find-routes/routes.view';
// import {TranslatePipe} from '../../../pipes/translate';

@Component({
  templateUrl: 'build/pages/jeepney/tabs/tabs.html'
})

export class TabsPage {

  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = JeepRoutesPage;
    this.tab2 = FindRoutesPage;
  }
}
