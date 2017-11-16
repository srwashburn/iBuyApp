import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ListsProvider } from '../../providers/lists/lists';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public listsService: ListsProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  showConfirm() {
  let confirm = this.alertCtrl.create({
    title: 'Are you certain?',
    message: 'Do you REALLY want to delete ALL of your beautiful lists??',
    buttons: [
      {
        text: 'Of course not!',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'DESTROY',
        handler: () => {
          console.log('Agree clicked');
          this.listsService.clearAllLists();
        }
      }
    ]
  });
  confirm.present();
}

}
