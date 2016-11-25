import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Systems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-systems',
  templateUrl: 'systems.html'
})
export class SystemsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SystemsPage Page');
  }

}
