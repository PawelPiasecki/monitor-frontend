import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { SystemsPage } from '../pages/systems/systems';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { SystemPage } from '../pages/system/system';
import { SensorPage } from '../pages/sensor/sensor';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    SystemsPage,
    NotificationsPage,
    SettingsPage,
    AboutPage,
    LoginPage,
    SystemPage,
    SensorPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
  providers: [Storage],
})

export class AppModule {}
