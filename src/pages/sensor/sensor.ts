import { Configuration } from './../../shared/app.configuration';
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Sensor } from '../../model/sensor';
import { $WebSocket } from 'angular2-websocket/angular2-websocket'

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
  public ws: $WebSocket;
  


    constructor(public navCtrl: NavController,public navParams: NavParams,_configuration: Configuration) {
    this.sensor=this.navParams.get('param1');
    this.ws = new $WebSocket("ws://"+_configuration.BaseURL+"/websocket");
    this.ws.onMessage(
      (msg: MessageEvent)=> {
          console.log("onMessage ", msg.data);
      },
      {autoApply: false}
    );

    this.ws.getDataStream().subscribe(
      (msg)=> {
          this.sensor.value=msg.data.toString();       
      },
      (msg)=> {
          console.log("error", msg);
      },
      ()=> {
          console.log("complete");
      }
    );
  }

  ionViewDidLoad() {
    console.log('Hello SensorPage Page');
  }

  ionViewWillLeave(){
    this.ws.close(true);
  }

}
