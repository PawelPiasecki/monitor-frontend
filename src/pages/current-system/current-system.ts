import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CurrentSystem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-current-system',
  templateUrl: 'current-system.html'
})
export class CurrentSystemPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CurrentSystemPage Page');
  }

}
