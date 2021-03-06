/**
 * File Name:     app/component.ts
 * Description:   Entry point of the program
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthData } from '../providers/auth-data';
import { MovieDetailsPage } from '../pages/movie-details/movie-details';
import { EpisodesPage } from '../pages/episodes/episodes';
import { EpisodeDetailsPage } from '../pages/episode-details/episode-details';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SearchPage } from '../pages/search/search';
import { SearchUserPage } from '../pages/search-user/search-user';
import { HomePage } from '../pages/home/home';
import { FavoritesPage } from '../pages/favorites/favorites';
import { FriendsListPage } from '../pages/friends-list/friends-list';
import { UserSettingsProvider } from '../providers/user-settings';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UpdateUserProfilePage } from '../pages/update-user-profile/update-user-profile';


// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyCmsDPLWbEJbwW3vAJ5LRUqCQV-OuYlIU4",
  authDomain: "moviestvlist.firebaseapp.com",
  databaseURL: "https://moviestvlist.firebaseio.com",
  storageBucket: "moviestvlist.appspot.com",
  messagingSenderId: "755631563317"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

/**
 * Specifies app's structure, dependencies, etc.
 * 
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    SearchPage,
    SearchUserPage,
    HomePage,
    MovieDetailsPage,
    EpisodesPage,
    EpisodeDetailsPage,
    FavoritesPage,
    FriendsListPage,
    UserDetailsPage,
    UpdateUserProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    SearchPage,
    SearchUserPage,
    HomePage,
    MovieDetailsPage,
    EpisodesPage,
    EpisodeDetailsPage,
    FavoritesPage,
    FriendsListPage,
    UserDetailsPage,
    UpdateUserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData,
    UserSettingsProvider
  ]
})
export class AppModule {
}
