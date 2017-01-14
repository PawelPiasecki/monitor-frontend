import { FORM_DIRECTIVES } from 'angular2/common';
import { System } from './../../../.tmp/model/system';
import { SystemsPage } from './../systems/systems';
import { AuthHttp } from 'angular2-jwt';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';



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

    LOGIN_URL: string = "http://192.168.1.10:8080/login";    
    authHttp: AuthHttp;
    auth: AuthService; 
    authToken: string; 
    // When the page loads, we want the Login segment to be selected
    authType: string = "login";
    // We need to set the content type for the server
    contentHeader: Headers = new Headers({"Content-Type": "application/json"});
    error: string;
    jwtHelper: JwtHelper = new JwtHelper();    
    user: string;

  constructor(public navCtrl: NavController,private http: Http,public storage: Storage) {    
    this.auth = AuthService;    
    this.storage.get('id_token').then((val)=> {
      this.authToken=val
    }).catch(error => {
      console.log(error);
    });

  }

  login(credentials) {
    console.log(JSON.stringify(credentials));
    this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })      
      .subscribe(
        res => this.authSuccess(res.headers.get("Authorization").substring(7)),
        err => this.error = err
      );
  }

  authSuccess(token) {
    console.log("Auth ok");
       
    this.error = null;
    this.authToken=token;
    this.storage.set('id_token', token).then(()=> {this.getSystems();});
    
    

  }

  getSystems() {     
    console.log("Getting Systems...")    
    //TODO add logout(clean key in storage)
    //TODO add check for token in memory
    
    let getHeaders: Headers = new Headers({"Authorization":this.authToken});
    this.http.get('http://192.168.1.10:8080/systems',{headers: getHeaders})
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
    console.log('Hello LoginPage Page');
  }

  

}
