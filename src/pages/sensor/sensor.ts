import { Configuration } from './../../shared/app.configuration';
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Sensor } from '../../model/sensor';
//import * as Stomp from 'stompjs';
//import * as SockJS from 'sockjs';
import { $WebSocket } from "angular2-websocket"


/*
  Generated class for the Sensor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var Stomp:any;

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
    //var socket = new $WebSocket("ws://"+_configuration.BaseURL+"/websockets");
    this.stompClient =  Stomp.client('ws://'+_configuration.BaseURL+'/websockets');
    //this.stompClient = Stomp.over(socket);
    this.stompClient.connect();

  }


  ionViewDidLoad() {
    console.log('Hello SensorPage Page');

    console.log(this.stompClient);
  }

  ionViewWillLeave(){
    this.stompClient.disconnect();
  }
  press(){
    this.stompClient.subscribe("/home1/temperature", function (msg) {
      //this.sensor.value=msg.body.toString();
      console.log(msg);
    });
  }
  send(){
    this.stompClient.send("/broker/home1/temperature", {}, JSON.stringify({  }));
  }
}
