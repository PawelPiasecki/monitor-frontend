import { FORM_DIRECTIVES } from 'angular2/common';
import { System } from './../../../.tmp/model/system';
import { SystemsPage } from './../systems/systems';
import { AuthHttp } from 'angular2-jwt';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import 'rxjs/add/operator/map'


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

    LOGIN_URL: string = "http://localhost:8080/login";    
    authHttp: AuthHttp;
    auth: AuthService; 
    systemsData: System[];
    // When the page loads, we want the Login segment to be selected
    authType: string = "login";
    // We need to set the content type for the server
    contentHeader: Headers = new Headers({"Content-Type": "application/json"});
    error: string;
    jwtHelper: JwtHelper = new JwtHelper();    
    user: string;

  constructor(public navCtrl: NavController,private http: Http,public storage: Storage) {
    this.auth = AuthService;    
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

  }

  login(credentials) {
    console.log(JSON.stringify(credentials));
    this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })      
      .subscribe(
        res => this.authSuccess(res.headers.get("Authorization")),
        err => this.error = err
      );
  }

  authSuccess(token) {
    console.log("Auth ok");
    this.error = null;
    this.storage.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
    this.getSystems();

  }

  getSystems() {
    this.authHttp.get('http://localhost:8080/systems')
      .subscribe(        
        data => this.systemsData = JSON.parse(data['_body']),
        err => console.log(err),
        () => console.log('Request Complete')
      );
      this.gotoSystemsPage();
    
  }

  gotoSystemsPage(){
    this.navCtrl.push(SystemsPage, {param1:this.systemsData} );
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  

}
