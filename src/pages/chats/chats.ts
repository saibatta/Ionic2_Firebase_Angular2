import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatsProvider } from '../../providers/chats-provider/chats-provider';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ChatViewPage } from '../chat-view/chat-view';
import { FirebaseListObservable } from 'angularfire2';

@Component({
    templateUrl: 'chats.html'
})
export class ChatsPage {
    chats: Observable<any[]>;
    userID;
    message: string;
    uid: string;
    interlocutor: string;
    chatName;
    pageName: string;
    chatsList: any[];
    public onlineCount;
    constructor(public chatsProvider: ChatsProvider,
        public userProvider: UserProvider,
        public af: AngularFire,
        public nav: NavController,
        private cdr: ChangeDetectorRef) {
        this.onlineCount = 0;
    }

    ionViewDidLoad() {
        this.chatsProvider.getChats()
            .then(chats => {
                this.chats = chats.map(users => {
                    return users.map(user => {
                        user.info = this.af.database.object(`/usersList/${user.$key}`);
                        return user;
                    });
                });
            });


        this.userProvider.getUser()
            .then(userObservable => {
                userObservable.subscribe(user => {
                    console.log(user)
                    this.userID = user.$key;

                });
            });

        // Get Chat Reference
        this.chatsProvider.getChatsList()
            .subscribe((chatRef: any) => {
                this.chatsList = chatRef;
                for (let i = 0; i < this.chatsList.length; i++) {
                    if (this.chatsList[i].to == this.userID && this.chatsList[i].status == false) {
                        this.onlineCount += 1;
                    }
                }

            });
    }



    openChat(key, chat) {
        this.userProvider.getUid()
            .then(uid => {
                let param = { uid: uid, interlocutor: key, chat: chat, pageFrom: false };
                this.nav.push(ChatViewPage, param);
            });
    }
}