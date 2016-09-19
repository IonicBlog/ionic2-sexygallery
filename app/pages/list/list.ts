import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from './../item-details/item-details';
import {SexyService} from './../../app.service';
// import {Gallery} from './../../models/Gallery';

@Component({
  templateUrl: 'build/pages/list/list.html',
  providers: [SexyService]
})
export class ListPage {
  selectedItem: any;
  title: String;

  // 定义列表模型数组
  items: Array<{
    fcount: String,
    galleryclass: String,
    id: String,
    img: String,
    rcount: String,
    size: String,
    time: String,
    title: String
  }>;
  constructor(
    navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public sexyService: SexyService) {

    this.selectedItem = navParams.get('item');
    this.getGalleries();
  }

  getGalleries() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.sexyService.getGalleries(this.selectedItem.id).subscribe(data => {
      this.items = data;
      loading.dismiss();
    })
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

}
