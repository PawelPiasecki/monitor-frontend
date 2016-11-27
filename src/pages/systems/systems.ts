import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SystemPage } from '../system/system';
import { System } from '../../model/system';
import { Room } from '../../model/room';
import { Sensor } from '../../model/sensor';

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

  systems: System[];
  rooms1: Room[];
  sensors1: Sensor[];

  constructor(public navCtrl: NavController) {

    this.sensors1 = [{id:1,name:"Sensor1",state: true,value:27}];
    this.rooms1 = [{id:1,name: "duzy pokoj",sensors: this.sensors1}];

    this.systems = [
       {id:1,name: "System #1",info: "infos",localization: "Babcia1",rooms: this.rooms1}
      
    ];

    

  }




  ionViewDidLoad() {
    console.log('Hello SystemsPage Page');
  }

  gotoSystem(system) {
    console.log(system);
     this.navCtrl.push(SystemPage, {param1:system} );
  }
}
