import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireModule, AuthProviders, AuthMethods, AngularFire, FirebaseApp } from 'angularfire2';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UsersPage } from '../pages/users/users';
import { ChatsPage } from '../pages/chats/chats';
import { AccountPage } from '../pages/account/account';
import { ChatViewPage } from '../pages/chat-view/chat-view';

import { SignUpPage } from '../pages/sign-up/sign-up';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { AuthProvider } from '../providers/auth-provider/auth-provider';
import { ChatsProvider } from '../providers/chats-provider/chats-provider';
import { UserProvider } from '../providers/user-provider/user-provider';
import { UtilProvider } from '../providers/utils';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { MessageCounts } from '../pipes/message-counts'

export const firebaseConfig = {
  apiKey: "AIzaSyBswrLgT6Vs4yGgBiKiqTRSewLL9jlMU7A",
  authDomain: "fir-chat-67328.firebaseapp.com",
  databaseURL: "https://fir-chat-67328.firebaseio.com",
  storageBucket: "fir-chat-67328.appspot.com",
};



const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    UsersPage,
    ChatsPage,
    AccountPage,
    ChatViewPage,
    SignUpPage,
    ForgotPasswordPage,
    UserDetailsPage,
    MessageCounts
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    UsersPage,
    ChatsPage,
    AccountPage,
    ChatViewPage,
    SignUpPage,
    ForgotPasswordPage,
    UserDetailsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider, ChatsProvider, UserProvider, UtilProvider, Storage]
})
export class AppModule { }
