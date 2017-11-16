import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ListsProvider } from '../../providers/lists/lists';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the DisplayListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-list',
  templateUrl: 'display-list.html',
})
export class DisplayListPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, public listsService: ListsProvider,
  public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListPage');
  }

  ionViewWillEnter(){
    this.listsService.load();
  }



  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Item',
      message: "Items cannot be added more than once.",
      inputs: [
        {
          name: 'itemName',
          placeholder: 'Item'
        },
        {
          name: 'itemPrice',
          placeholder: '0.00',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(data.itemName === ''){
              return false;
              //prompt.present();
            }else if(this.listsService.isItemInList(data.itemName)){
              return false;
          }
            else{
              this.listsService.addItem(data.itemName, data.itemPrice);
              console.log('Saved clicked');
            }

          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present();
  }

  dismiss() {
    //this.listsService.load();
    this.viewCtrl.dismiss();
    //this.listsService.listName = '';
  }

  showAlert() {
   let alert = this.alertCtrl.create({
     title: 'New Friend!',
     subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
     buttons: ['OK']
   });
   alert.present();
 }

}
