import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';

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
        public util: UtilProvider) {
        this.userProvider.getUser()
            .then(userObservable => {
                userObservable.subscribe(user => {
                    this.user = user;
                });
            });
    }

    //save user info
    updatePicture() {
        this.userProvider.updatePicture();
    };

    // logout() {
    //     this.local.remove('uid');
    //     this.auth.logout();
    // }

    logout() {
        this.auth.logout()
            .then((data) => {
                this.local.remove('uid');
            }, (error) => {
                let alert = this.util.doAlert("Error", error.message, "Ok");
                alert.present();
            });
    };
}