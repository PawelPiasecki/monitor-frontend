import { SystemsService } from './../../services/systems/systems.service';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { SystemPage } from '../system/system';
import { System } from '../../model/system';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { Configuration } from './../../shared/app.configuration';

/*
  Generated class for the Systems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-systems',
  templateUrl: 'systems.html',
  providers: [Configuration]
})
export class SystemsPage {

  systems: System[];
  authToken: string;  
  Base_URL: string;

  constructor(public navCtrl: NavController,private http: Http,public navParams: NavParams,private _configuration: Configuration,private menuCtrl: MenuController,private systemsService: SystemsService,public storage: Storage) {
    this.menuCtrl.enable(true);
    this.Base_URL = "http://"+_configuration.BaseURL
    console.log(this.systemsService.getSystems());    
    this.systems=this.systemsService.getSystems();   

  }

  refreshSystems(){
    this.storage.get('auth_token').then((val)=> {
      this.authToken=val;
    }).catch(error => {
      console.log(error);
    }).then(()=>this.getSystems());
  }

  getSystems(){
    console.log("Getting Systems...");
    console.log("AuthToken:"+this.authToken);   
    let getHeaders: Headers = new Headers({"Authorization":this.authToken});
    this.http.get(this.Base_URL+"/systems",{headers: getHeaders})     
      .subscribe(        
        res => this.setSystems(res.json()), 
        err => console.log(err),
        () => console.log('Request Complete')
      );    
  }

  setSystems(systems){
    this.systems=systems;
  }

  ionViewDidLoad() {
    console.log('Hello SystemsPage Page');
  }

  gotoSystem(system) {
    console.log(system);
     this.navCtrl.push(SystemPage, {param1:system} );
  }
}
