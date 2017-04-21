import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { validateEmail } from '../../validators/email';

import { Inject } from '@angular/core';
import { AngularFire, FirebaseApp } from 'angularfire2';
import { LoginPage } from '../../pages/login/login'

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  private auth: any;
  private errorMessage: any;
  public forgotForm: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire, @Inject(FirebaseApp) fa: any) {
    this.auth = fa.auth();
    this.forgotForm = new FormGroup({
      email: new FormControl("", [Validators.required, validateEmail])

    });

  }

  //forgot password
  onSubmit(email) {
    this.auth.sendPasswordResetEmail(email)
      .then(resp => {
        console.log('sent!');
        this.errorMessage = "Successfully Link sent to registered Mail";
        this.navCtrl.push(LoginPage)

      })
      .catch(error => {
        console.log('failed to send', error.message)
        this.errorMessage = error.message;

      });
  }


}
