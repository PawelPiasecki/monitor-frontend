import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Sensor } from '../../model/sensor';
/*
  Generated class for the Sensor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html'
})
export class SensorPage {
  
  public sensor: Sensor;

    constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.sensor=this.navParams.get('param1');
  }

  ionViewDidLoad() {
    console.log('Hello SensorPage Page');
  }

}
