import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CreateListPage } from '../create-list/create-list';
import { DisplayListPage } from '../display-list/display-list';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListsProvider } from "../../providers/lists/lists";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  constructor(public navCtrl: NavController, public storage: Storage, public listsService: ListsProvider, public modalCtrl: ModalController) {

  }

  ionViewWillEnter(){
    this.listsService.load();
  }

  presentModalNewList(){
    this.listsService.listName = '';
    let modal = this.modalCtrl.create(CreateListPage);
    modal.onDidDismiss(() => {
      this.listsService.load();
    });
    modal.present();
  }

  presentModalDisplayList(){
    //this.listsService.loadListItems(name.listName);
    let modal = this.modalCtrl.create(DisplayListPage);
    modal.present();
  }



}
