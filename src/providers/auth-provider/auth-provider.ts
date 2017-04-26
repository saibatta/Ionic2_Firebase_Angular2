import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Injectable()
export class AuthProvider {
  constructor(public af: AngularFire, public local: Storage) { }

  signin(credentails) {
    return this.af.auth.login(credentails);
  }

  createAccount(credentails) {
    return this.af.auth.createUser(credentails);
  };

  logout() {
    return this.af.auth.logout();
  }

  userStuatus(uid) {
    // since I can connect from multiple devices or browser tabs, we store each connection instance separately
    // any time that connectionsRef's value is null (i.e. has no children) I am offline
    var myConnectionsRef = firebase.database().ref(`users/${uid}/connections`);

    // stores the timestamp of my last disconnect (the last time I was seen online)
    var lastOnlineRef = firebase.database().ref(`users/${uid}/lastOnline`);

    var connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', function (snap) {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

        // add this device to my connections list
        // this value could contain info about the device or a timestamp too
        var con = myConnectionsRef.push(true);

        // when I disconnect, remove this device
        con.onDisconnect().remove();
        lastOnlineRef.set(firebase.database.ServerValue.TIMESTAMP);

        // when I disconnect, update the last time I was seen online
        lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
      }
    });

  }

}

