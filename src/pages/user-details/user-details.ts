import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  public userData;
  public userPageName;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.userData = navParams.data.userDetails;
    if (navParams.data.userPageName)
      this.userPageName = navParams.data.userPageName;
    else
      this.userPageName = navParams.data.userPageName;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

}
