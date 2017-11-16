import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { DisplayListPage } from '../display-list/display-list';
import { ListsProvider } from '../../providers/lists/lists';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public listsService: ListsProvider, public storage: Storage, public modalCtrl: ModalController) {

  }

ionViewWillEnter(){
  this.listsService.load();
}

presentModalDisplayList(){
  //this.listsService.loadListItems(name.listName);
  let modal = this.modalCtrl.create(DisplayListPage);
  modal.onDidDismiss(() => {
    this.listsService.load();
  });
  modal.present();
}
}
