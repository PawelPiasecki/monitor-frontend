import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { System } from '../../model/system';
import { SensorPage } from '../sensor/sensor'


/*
  Generated class for the System page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-system',
  templateUrl: 'system.html'
})
export class SystemPage {

  public system: System;

  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.system=this.navParams.get('param1');
  }

  

  ionViewDidLoad() {
    console.log('Hello SystemPage Page');
  }

  gotoSensor(sensor) {    
     this.navCtrl.push(SensorPage, {param1:sensor} );
  }

}
