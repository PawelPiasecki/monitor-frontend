import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  notifications: Array <{content: String,date: Date}>;
  groupedNotifications = [];

  constructor(public navCtrl: NavController) {

    this.notifications = [
      {content:"Czujnik1 wykryl dym",date: new Date("2016-11-26T18:32:00")},
      {content:"Czujnik2 wykryl niezamniete drzwi",date: new Date("2016-11-25T12:34:00")},
    ];

    this.groupNotifications(this.notifications);
    console.log(this.groupedNotifications)
  }

  groupNotifications(notifications){
    console.log('Started sorting');
    let sortedNotifications = notifications.sort((a,b) => {     
      if(a.date > b.date){        
        return -1;
      }else if(b.date > a.date){        
        return 1
      }else {        
        return 0;
        
      }
    });
    console.log(sortedNotifications);
    let currentDate =false;
    let currentNotifications = [];

    for (let notification of sortedNotifications){
      console.log(notification.date);
      if(notification.date != currentDate){
        currentDate=notification.date;

        let newGroup = {
          date: currentDate,
          notifications: []
        };

        currentNotifications = newGroup.notifications;
        console.log(currentNotifications)
        this.groupedNotifications.push(newGroup);
      }

      currentNotifications.push(notification)
      

    }
  }

  ionViewDidLoad() {
    console.log('Hello NotificationsPage Page');
  }

}
