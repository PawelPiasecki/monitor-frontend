import { Component } from '@angular/core';
import { Configuration } from './../../shared/app.configuration';
import { Headers, Http } from '@angular/http';
import { MenuController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SystemsPage } from './../systems/systems';
import { SystemsService } from './../../services/systems/systems.service';
import 'rxjs/add/operator/map';


    //TODO add logout(clean key in storage)

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',  
  providers: [Configuration]
})
export class LoginPage {

    Base_URL: string;
    authToken: string;      
    contentHeader: Headers = new Headers({"Content-Type": "application/json"}); // Content-Type header
    error: string;
    user: string;

  constructor(public navCtrl: NavController,private http: Http,public storage: Storage,private menuCtrl: MenuController,private _configuration: Configuration,public systemsService: SystemsService) {
    this.Base_URL = "http://"+_configuration.BaseURL
    this.menuCtrl.enable(false);   
    this.storage.get('auth_token').then((val)=> {
      this.authToken = val;

    }).catch(error => {
      console.log(error);
    }).then(()=>this.checkFingerprint());

  }

  login(credentials) {
    console.log(JSON.stringify(credentials));
    this.http.post(this.Base_URL+"/login", JSON.stringify(credentials), { headers: this.contentHeader })      
      .subscribe(
        res => this.authSuccess(res.headers.get("Authorization").substring(7)),
        err => this.error = err
      );
  }

  authSuccess(token) {
    console.log("Auth ok");
       
    this.error = null;
    this.authToken=token;
    this.storage.set('auth_token', token).then(()=> {this.getSystems();});  
    

  }

  getSystems() {     
    console.log("Getting Systems...");
    console.log("AuthToken:"+this.authToken);   
    let getHeaders: Headers = new Headers({"Authorization":this.authToken});
    this.http.get(this.Base_URL+"/systems",{headers: getHeaders})     
      .subscribe(        
        res => this.gotoSystemsPage(res.json()), 
        err => console.log(err),
        () => console.log('Request Complete')
      );    
    
  }  

  checkFingerprint() {
    console.log(this.authToken);
    let that = this;
    if(this.authToken !== null){
       if ((<any>window).plugins.touchid.isAvailable) {
      (<any>window).plugins.touchid.verifyFingerprint(
        'Scan your fingerprint please', // this will be shown in the native scanner popup
        function (msg) { that.getSystems() }, // success handler: fingerprint accepted
        function (msg) { alert('Please try again: ' + JSON.stringify(msg)) } // error handler with errorcode and localised reason
      );
      } else {
        this.getSystems();
      }
  }
   
     
    
  }

  gotoSystemsPage(systemsData){
    this.systemsService.setSystems(systemsData);
    console.log(systemsData);
    this.navCtrl.setRoot(SystemsPage);
  }

  ionViewDidLoad() {
   
  }

  

}
