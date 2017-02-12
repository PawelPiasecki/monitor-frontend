import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public navParams: NavParams,private menuCtrl: MenuController) {
    this.menuCtrl.enable(true);    
    this.systems=this.navParams.get('param1');
   

    

  }




  ionViewDidLoad() {
    console.log('Hello SystemsPage Page');
  }

  gotoSystem(system) {
    console.log(system);
     this.navCtrl.push(SystemPage, {param1:system} );
  }
}
