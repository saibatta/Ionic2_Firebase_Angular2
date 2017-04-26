import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { validateEmail } from '../../validators/email';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  signupForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,
    public userProvider: UserProvider,
    public util: UtilProvider,
    public storage: Storage) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, validateEmail]),
      password: new FormControl("", Validators.required),
      cnfpassword: new FormControl("", Validators.required),
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      mobno: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  createAccount() {
    let credentials = this.signupForm.value;
    this.auth.createAccount(credentials)
      .then((data) => {
        this.storage.set('uid', data.uid);
        this.userProvider.createUser(credentials, data.uid);

        this.userProvider.loginStatus(data.uid);

      }, (error) => {
        let alert = this.util.doAlert("Error", error.message, "Ok");
        alert.present();
      });
  }
}
