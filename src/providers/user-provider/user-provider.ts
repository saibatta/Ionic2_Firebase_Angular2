import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class UserProvider {

  public onlineList: FirebaseListObservable<any>;
  public currentUserOnlineRef;
  public amOnline: FirebaseObjectObservable<any>;
  public userRef: FirebaseObjectObservable<any>;
  public lastOnlineRef: FirebaseListObservable<any>;

  constructor(public af: AngularFire, public local: Storage) { }

  // Get Current User's UID
  getUid() {
    return this.local.get('uid');
  }

  // Create User in Firebase
  createUser(userCredentails, uid) {
    let currentUserRef = this.af.database.object(`/usersList/${uid}`);
    console.log(userCredentails);
    currentUserRef.set({ email: userCredentails.email, data: userCredentails,status:'offline' });
  }

  // Get Info of Single User
  getUser() {
    // Getting UID of Logged In User
    return this.getUid().then(uid => {
      return this.af.database.object(`/usersList/${uid}`);
    });
  }


  // Get All Users of App
  getAllUsers() {
    return this.af.database.list('/usersList');
  }

  // Get base64 Picture of User
  getPicture() {
    let base64Picture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };

    let promise = new Promise((resolve, reject) => {
      Camera.getPicture(options).then((imageData) => {
        base64Picture = "data:image/jpeg;base64," + imageData;
        resolve(base64Picture);
      }, (error) => {
        reject(error);
      });

    });
    return promise;
  }

  // Update Provide Picture of User
  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.af.database.object(`/usersList/${uid}/picture`);
      this.getPicture()
        .then((image) => {
          pictureRef.set(image);
        });
    });
  }



  loginStatus(userid) {
    this.userRef = this.af.database.object(`/usersList/${userid}`, { preserveSnapshot: true });
    this.userRef.update({ status: 'online' });
  }



  logoutStatus(userid) {
    this.userRef = this.af.database.object(`/usersList/${userid}`, { preserveSnapshot: true });   
    this.userRef.update({ status: 'offline' });
  }


  userStatus() {
    this.userRef = this.af.database.object(`/usersList`);
  }


}

