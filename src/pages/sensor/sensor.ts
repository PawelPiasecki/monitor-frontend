import { Configuration } from './../../shared/app.configuration';
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Sensor } from '../../model/sensor';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs';



/*
  Generated class for the Sensor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html',
  providers: [Configuration]
  
})
export class SensorPage {
  
  public sensor: Sensor;
  stompClient: any;

  


  constructor(public navCtrl: NavController,public navParams: NavParams,_configuration: Configuration) {
    this.sensor=this.navParams.get('param1');    
    var socket = new SockJS(_configuration.BaseURL+"/websockets");
    this.stompClient = Stomp.over(socket);
    console.log(this.stompClient);
    console.log(socket);
    this.stompClient.connect({}, function (frame) {
        console.log("Connected: " + frame);
        this.stompClient.subscribe("/home1/temperature", function (msg) {
            this.sensor.value=msg.data.toString();     
        });
    }, function (err) {
        console.log('err', err);
    });
  }

  
   

  ionViewDidLoad() {
    console.log('Hello SensorPage Page');
  }

  ionViewWillLeave(){
    this.stompClient.disconnect();
  }

}
