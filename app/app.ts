import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {SexyService} from './app.service' //导入我们的服务
import {ConfigService} from "./services/ConfigService";


@Component({
  templateUrl: 'build/app.html',
  providers: [SexyService, ConfigService]
})

class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HelloIonicPage;
  pages: Array<{ item: any, component: any }>;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public sexyService: SexyService
  ) {
    platform.setLang('zh', true);
  }

  ngOnInit() {
    // 动态获取抽屉菜单
    this.sexyService.getMenuItems().subscribe(data => {
      this.pages = [];
      for (var i = 0; i < data.length; i++) {
        var c = data[i];
        // 组织新的数据
        this.pages.push({
          item: { id: c.id, title: c.title },
          component: ListPage
        })
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component, {
      item: page.item
    });
  }
}

ionicBootstrap(MyApp, null, {
  backButtonText: ''
});

 // registerBackButtonListener() {
  //   document.addEventListener('backbutton', () => {
  //     if (this.nav.canGoBack()) {
  //       this.nav.pop();
  //       return;
  //     } 
  //     if (!this.backPressed) {
  //       this.backPressed = true;
  //       Toast.showShortBottom("再按一次退出应用").subscribe(
  //         toast => {
  //           console.log(toast);
  //         }
  //       );
  //       setTimeout(() => this.backPressed = false, 2000);
  //       return;
  //     }
  //     // 利用 cordova.js 退出应用(不影响使用)
  //     // navigator.app.exitApp();
  //   }, false);
  // }
