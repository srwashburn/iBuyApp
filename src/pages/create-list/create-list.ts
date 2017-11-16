import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ListsProvider } from '../../providers/lists/lists';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CreateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-list',
  templateUrl: 'create-list.html',
})
export class CreateListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public listsService: ListsProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateListPage');
  }

  ionViewWillEnter(){

  }


  dismiss() {
    this.viewCtrl.dismiss();
    //this.listsService.listName = '';
  }

  checkValid(){
    console.log(this.listsService.listName);
    console.log(this.listsService.lists);
    if(this.listsService.listName === ''){
      this.showEmptyNameAlert();
    }
    else if(this.listsService.doesListExist(this.listsService.listName)){
      this.showInvalidNameAlert();
    }
    else{
      this.listsService.createList();
      this.dismiss();
    }
  }

  showEmptyNameAlert() {
    let alert = this.alertCtrl.create({
      title: 'Invalid Name',
      subTitle: 'Please enter a valid list name',
      buttons: ['OK']
    });
    alert.present();
  }

  showInvalidNameAlert() {
    let alert = this.alertCtrl.create({
      title: 'List Already Exists',
      subTitle: 'Please enter a new list name',
      buttons: ['OK']
    });
    alert.present();
  }



}
