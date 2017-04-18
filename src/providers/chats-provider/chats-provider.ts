import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserProvider } from '../user-provider/user-provider';

@Injectable()
export class ChatsProvider {
    constructor(public af: AngularFire, public up: UserProvider) { }
    // get list of Chats of a Logged In User
    getChats() {
        return this.up.getUid().then(uid => {
            let chats = this.af.database.list(`/users/${uid}/chats`);
            return chats;
        });
    }

    // Add Chat References to Both users
    addChats(uid, interlocutor) {
        // First User
        let endpoint = this.af.database.object(`/users/${uid}/chats/${interlocutor}`);
        endpoint.set(true);

        // Second User
        let endpoint2 = this.af.database.object(`/users/${interlocutor}/chats/${uid}`);
        endpoint2.set(true);
    }

    getChatRef(uid, interlocutor) {
        let firstRef = this.af.database.object(`/chats/${uid},${interlocutor}`, { preserveSnapshot: true });
        let promise = new Promise((resolve, reject) => {
            firstRef.subscribe(snapshot => {
                let a = snapshot.exists();
                if (a) {
                    resolve(`/chats/${uid},${interlocutor}`);
                } else {
                    let secondRef = this.af.database.object(`/chats/${interlocutor},${uid}`, { preserveSnapshot: true });
                    secondRef.subscribe(snapshot => {
                        let b = snapshot.exists();
                        if (!b) {
                            this.addChats(uid, interlocutor);
                        }
                    });
                    resolve(`/chats/${interlocutor},${uid}`);
                }
            });
        });

        return promise;
    }

    userStatus(userid) {

        // since I can connect from multiple devices or browser tabs, we store each connection instance separately
        // any time that connectionsRef's value is null (i.e. has no children) I am offline
        var myConnectionsRef = this.af.database.object('users/joe/connections');

        // stores the timestamp of my last disconnect (the last time I was seen online)
        var lastOnlineRef = this.af.database.object('users/joe/lastOnline');
        let connectedRef = this.af.database.object(".info/connected");
        let userRef = this.af.database.object('presence/' + `${userid}`);
        connectedRef.subscribe(snap => {

            if (snap.$value) {
                userRef.set(true);
                // alert("connected")

            } else {
                userRef.set(false);
                alert("not connected")

            }
        });
    }

}

