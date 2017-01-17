import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController,public storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }

  logOut(){
    this.storage.remove('auth_token').catch(error => {
      console.log(error);
    }).then(()=>this.navCtrl.setRoot(LoginPage));
  }

}
