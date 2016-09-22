import { Component, provide } from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {LandingPage} from './pages/landingpage/landingpage';

import {DataService} from './providers/data-service/data-service';

import {ConnectivityService} from './providers/connectivity-service/connectivity-service';

import {GeolocationService} from './providers/geolocation-service/geolocation-service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [GeolocationService]
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform, private  translate: TranslateService) {
    this.rootPage = LandingPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    this.translateConfig();
  }

translateConfig() {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(en|ja)/gi.test(userLang) ? userLang : 'en';

    console.log(userLang);

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('ja');
  }
}

ionicBootstrap(MyApp, [[provide(TranslateLoader, {
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  }),
  TranslateService, ConnectivityService, DataService,]], {
  iconMode: 'md',
  backButtonIcon: 'ios-arrow-back',
  backButtonText: '',
  tabsPlacement: 'top',
  prodMode: true
});
