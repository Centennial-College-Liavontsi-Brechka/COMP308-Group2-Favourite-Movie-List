import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { AuthData } from '../providers/auth-data';


@Component({
  templateUrl: 'app.html',
  providers: [OneSignal]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public af: AngularFire,
    public authData: AuthData,
    public oneSignal: OneSignal
  ) {
    this.initializeApp();

    this.pages = [

      { title: 'Home', component: HomePage },
      { title: 'Search', component: SearchPage },
      { title: 'My Profile', component: UserDetailsPage },
      { title: 'Logout', component: LoginPage }

    ];

    const authObserver = af.auth.subscribe(user => {
      if (user) {
        // send firebase userId to push server
        this.oneSignal.sendTag('fbuid',user.uid);
        console.log('sent id: '+user.uid);
        
        this.oneSignal.endInit();
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // set up device to get push notifications
      this.oneSignal.startInit('9906cb18-3cc8-4f29-8552-0667c86525a1', '755631563317');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        alert('you got an alert');
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        alert('you opened from an alert');
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === 'Logout') {
      this.af.auth.logout();
    }

    if (page.title === 'My Profile') {
      this.nav.setRoot(page.component, { userId: this.authData.authState.uid });
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
