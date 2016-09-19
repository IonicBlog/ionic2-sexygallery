import {Component} from '@angular/core';
import {NavController,  NavParams} from 'ionic-angular';
import {SexyService} from './../../app.service';
import {Transfer } from 'ionic-native';
import {ActionSheetController} from 'ionic-angular';

// 定义cordova
declare var cordova: any;

@Component({
  templateUrl: 'build/pages/item-details/item-details.html',
  providers: [SexyService]
})
export class ItemDetailsPage {

  // 用来接收上一个页面传递过来的参数 any为任意类型
  selectedItem: any;

  // 定义图片集合
  items: Array<{
    id: String,
    src: String,
    gallery: String
  }>;

  // 定义构造函数
  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public sexyService: SexyService,
    navParams: NavParams) {

    this.selectedItem = navParams.get('item');

    this.getDetails();
  }

  // 获取图片集合
  getDetails() {
    this.sexyService.getDetails(this.selectedItem.id).subscribe(data => {
      this.items = data;
    })
  }

  // 点击图片时
  itemTapped(event, item) {
    var imgSrc = "http://tnfs.tngou.net/image"+item.src;
    this.presentActionSheet(imgSrc);
  }

  // 弹出选择框
  presentActionSheet(imgUrl:string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '提示',
      buttons: [
        {
          text: '保存到相册',
          role: 'destructive',
          handler: () => {
            this.saveImage(imgUrl);
            console.log('Destructive clicked');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  saveImage(imgUrl) {
    // 取出图片的文件名
    var filename = imgUrl.split("/").pop();
    var targetPath = cordova.file.externalRootDirectory + "DCIM/Camera/" + filename;
    // this.fileTransfer.download(imgUrl, targetPath, true, {}).then(res => {
    //   alert("保存成功");
    // }).catch(reason => {
    //   alert(reason);
    // })
  }

}
