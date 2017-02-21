import { SystemsService } from './../services/systems/systems.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SystemsPage } from '../pages/systems/systems';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { SystemPage } from '../pages/system/system';
import { SensorPage } from '../pages/sensor/sensor';
import { Storage } from '@ionic/storage';
import { ActivePipe } from '../pages/system/isactive-pipe';



@NgModule({
  declarations: [
    MyApp,
    SystemsPage,
    NotificationsPage,
    SettingsPage,
    AboutPage,
    LoginPage,
    SystemPage,
    SensorPage,
    ActivePipe

  ],
  imports: [
    IonicModule.forRoot(MyApp,{platforms: {android: {scrollAssist: false,autoFocusAssist: false}}})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SystemsPage,
    NotificationsPage,
    SettingsPage,
    AboutPage,
    LoginPage,
    SystemPage,
    SensorPage

  ],
  providers: [Storage,{provide: ErrorHandler, useClass: IonicErrorHandler}],
  
})

export class AppModule {}
