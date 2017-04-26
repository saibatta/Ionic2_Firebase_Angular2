import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ChatsProvider } from '../../providers/chats-provider/chats-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UserDetailsPage } from '../../pages/user-details/user-details'

@Component({
    selector: 'chat-view',
    templateUrl: 'chat-view.html',
})
export class ChatViewPage {
    message: string;
    uid: string;
    interlocutor: string;
    chatName;
    pageName: string;
    chats: FirebaseListObservable<any>;
    @ViewChild(Content) content: Content;
    constructor(public nav: NavController,
        params: NavParams,
        public chatsProvider: ChatsProvider,
        public af: AngularFire,
        public userProvider: UserProvider) {

        this.uid = params.data.uid;
        this.interlocutor = params.data.interlocutor;
        this.pageName = params.data.pageFrom;

        if (this.pageName)
            this.chatName = params.data.chat;

        else
            this.chatName = params.data.chat;

        // Get Chat Reference
        chatsProvider.getChatRef(this.uid, this.interlocutor)
            .then((chatRef: any) => {
                this.chats = this.af.database.list(chatRef);
            });
    }

    ionViewDidEnter() {
        this.content.scrollToBottom();
    }


    sendMessage() {
        if (this.message) {
            let chat = {
                to: this.interlocutor,
                from: this.uid,
                message: this.message,
                type: 'message',
                status: false
            };
            this.chats.push(chat);
            this.message = "";
        }
    };
    userDetails(userData, pageName) {
        let params = { userDetails: userData, userPageName: pageName }
        this.nav.push(UserDetailsPage, params)
    }

    sendPicture() {
        let chat = { from: this.uid, type: 'picture', picture: null };
        this.userProvider.getPicture()
            .then((image) => {
                chat.picture = image;
                this.chats.push(chat);
            });
    }
}
