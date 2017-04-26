import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserProvider } from '../user-provider/user-provider';


@Injectable()
export class ChatsProvider {

    constructor(public af: AngularFire, public up: UserProvider) { }
    // get list of Chats of a Logged In User
    getChats() {
        return this.up.getUid().then(uid => {
            let chats = this.af.database.list(`/usersList/${uid}/chats`);
            return chats;
        });
    }

    // get list of Chats of a Logged In User
    getChatsList() {
        let chats = this.af.database.list(`/chats`);
        return chats;
    }

    // Add Chat References to Both users
    addChats(uid, interlocutor) {
        // First User
        let endpoint = this.af.database.object(`/usersList/${uid}/chats/${interlocutor}`);
        endpoint.set(true);

        // Second User
        let endpoint2 = this.af.database.object(`/usersList/${interlocutor}/chats/${uid}`);
        endpoint2.set(true);
    }

    getChatRef(uid, interlocutor) {
        let firstRef = this.af.database.object(`/chats`, { preserveSnapshot: true });
        let promise = new Promise((resolve, reject) => {
            firstRef.subscribe(snapshot => {
                let a = snapshot.exists();
                if (a) {
                    resolve(`/chats`);
                } else {
                    let secondRef = this.af.database.object(`/chats`, { preserveSnapshot: true });
                    secondRef.subscribe(snapshot => {
                        let b = snapshot.exists();
                        if (!b) {
                            this.addChats(uid, interlocutor);
                        }
                    });
                    resolve(`/chats`);
                }
            });
        });

        return promise;
    }



}

