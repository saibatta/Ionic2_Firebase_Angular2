import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatViewPage } from '../chat-view/chat-view';

import { ChatsProvider } from '../../providers/chats-provider/chats-provider';

@Component({
    templateUrl: 'users.html'
})
export class UsersPage {
    users: FirebaseListObservable<any[]>;
    chatsProvidervalue: any;
    uid: string;
    constructor(public nav: NavController, public userProvider: UserProvider, public chatsProvider: ChatsProvider) { }

    ngOnInit() {
        this.userProvider.getUid()
            .then(uid => {
                this.uid = uid;
                this.users = this.userProvider.getAllUsers();
                // this.chatsProvidervalue = this.chatsProvider.userStatus();
            });
    };

userStatus(key){    
  this.chatsProvidervalue = this.chatsProvider.userStatus(key);
//  alert(this.chatsProvidervalue )
  return this.chatsProvidervalue;

}


    openChat(key, chat) {
        let param = { uid: this.uid, interlocutor: key, chat: chat, pageFrom: true };
        this.nav.push(ChatViewPage, param);
    }
}