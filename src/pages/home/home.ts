import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { DisplayListPage } from '../display-list/display-list';
import { ListsProvider } from '../../providers/lists/lists';
import { CreditsPage } from '../credits/credits';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public listsService: ListsProvider) {

  }

  ionViewWillEnter(){
    this.listsService.load();
  }


  presentModalDisplayList(){
    if(this.listsService.doesListExist(this.listsService.currentList.name)){
      let modal = this.modalCtrl.create(DisplayListPage);
      modal.present();
    }

  }

  goToCredits(){

    this.navCtrl.push(CreditsPage);
  }

  goToSettings(){
    this.navCtrl.push(SettingsPage);
  }

}
