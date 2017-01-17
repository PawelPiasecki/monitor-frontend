import { FORM_DIRECTIVES } from 'angular2/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SystemsPage } from './../systems/systems';
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
  providers: []
})
export class LoginPage {

    BASE_URL: string = "http://95.85.21.239:8080" 
    authToken: string;      
    contentHeader: Headers = new Headers({"Content-Type": "application/json"}); // Content-Type header
    error: string;
    user: string;

  constructor(public navCtrl: NavController,private http: Http,public storage: Storage,private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);   
    this.storage.get('auth_token').then((val)=> {
      this.authToken=val;
    }).catch(error => {
      console.log(error);
    }).then(()=>this.getSystems());

  }

  login(credentials) {
    console.log(JSON.stringify(credentials));
    this.http.post(this.BASE_URL+"/login", JSON.stringify(credentials), { headers: this.contentHeader })      
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
    this.http.get(this.BASE_URL+"/systems",{headers: getHeaders})
      .map(res => res.json())
      .subscribe(        
        _embedded => this.gotoSystemsPage(_embedded.systems), 
        err => console.log(err),
        () => console.log('Request Complete')
      );    
    
  }  

  gotoSystemsPage(systemsData){
    console.log(systemsData);
    this.navCtrl.setRoot(SystemsPage, {param1:systemsData} );
  }

  ionViewDidLoad() {
   
  }

  

}
