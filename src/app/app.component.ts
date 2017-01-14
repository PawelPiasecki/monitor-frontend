import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { SystemsPage } from '../pages/systems/systems';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';


declare var FCMPlugin;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, iconName: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Systems', component: SystemsPage, iconName: "ios-globe-outline"},
      { title: 'NotificationsPage', component: NotificationsPage, iconName: "ios-chatboxes-outline"},
      { title: 'Settings', component: SettingsPage , iconName: "ios-options-outline"},
      { title: 'About', component: AboutPage, iconName: "ios-cloud-outline"}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      FCMPlugin.getToken(
        function (token) {
            console.log(token);           
        },
        function (err) {
            console.log('error retrieving token: ' + err);
        }
      );

      FCMPlugin.onNotification(
        
        function(data){            
          if(data.wasTapped){
          //Notification opened from bar  
            console.log(data);  
          }else{                 
          //Notification opened when application was active
            console.log(data);
          }
        },
        function(msg){
            console.log('onNotification callback successfully registered: ' + msg);
        },
        function(err){
            console.log('Error registering onNotification callback: ' + err);
        }
        );
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
