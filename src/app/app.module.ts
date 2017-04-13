import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SensorPage } from '../pages/sensor/sensor';
import { SettingsPage } from '../pages/settings/settings';
import { ActivePipe } from '../pages/system/isactive-pipe';
import { SystemPage } from '../pages/system/system';
import { SystemsPage } from '../pages/systems/systems';
import { MyApp } from './app.component';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';



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
    IonicModule.forRoot(MyApp,{platforms: {android: {scrollAssist: false,autoFocusAssist: false}}}),
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpModule
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
  providers: [],
  
})

export class AppModule {}
