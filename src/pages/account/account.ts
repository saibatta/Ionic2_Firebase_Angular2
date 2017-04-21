import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';

import { LoginPage } from '../../pages/login/login';

import { AngularFire } from 'angularfire2';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";

@Component({
    templateUrl: 'account.html'
})
export class AccountPage {
    rootNav;
    user = {};
    constructor(public nav: NavController,
        public auth: AuthProvider,
        public userProvider: UserProvider,
        public local: Storage,
        public util: UtilProvider,
        public af: AngularFire) {
        this.userProvider.getUser()
            .then(userObservable => {
                userObservable.subscribe(user => {
                    this.user = user.data;
                    console.log(user)
                });
            });

    }

    //save user info
    updatePicture() {
        this.userProvider.updatePicture();
    };
    logout(): void {
       // this.userProvider.userStatus(this.local.get('uid'));
        this.local.get('uid')
        this.local.remove('uid');
        this.auth.logout();

        this.nav.push(LoginPage);
    }
}