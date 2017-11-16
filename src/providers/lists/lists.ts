import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage} from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ListsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListsProvider {

  lists: any = [];
  currentItems: any = [];
  favoriteLists: any = [];
  listName = '';
  itemPrice = 0;
  currentList = {name: '', items:[], favorite:false};
  //currentListIndex = 0;

  constructor(public http: Http, public storage: Storage, public alertCtrl: AlertController) {

    //console.log(this.listKeys);

  }

  load(){
  //this.listKeys = Object.keys(this.lists);
  //this.storage.clear();
  this.storage.get('lists').then((val) => {
    if(val == undefined){
      //this.lists = [];
    }else{
      console.log(val);
      this.favoriteLists = [];
      this.lists = JSON.parse(val);
      var i;
      for(i = 0; i < this.lists.length; i++){
          if(this.lists[i].favorite){
              this.favoriteLists.push(this.lists[i]);
          }
      }
    }

  });
  this.storage.get('mostRecentList').then((val) => {
      if(val != undefined){
            this.currentList = JSON.parse(val);
            console.log('got most recent list');
      }

  });




 }

 createList(){
   this.storage.get('lists').then((val) => {
      if(val == undefined){
         console.log("Val is NULL");
         this.lists.push({"name": this.listName, "items":[]});
         console.log(this.lists);
         this.storage.set('lists', JSON.stringify(this.lists));
      }else{
        this.lists = JSON.parse(val);
        this.lists.push({"name": this.listName, "items":[], "favorite": false});
        //console.log(Object.keys(this.lists));
        console.log(this.lists);
        this.storage.set('lists', JSON.stringify(this.lists));
      }

   });

 }

 removeList(name){
    console.log(name);
    var i;
    for(i = 0; i < this.lists.length; i++){
          if(this.lists[i].name === name.listName){
                console.log("FOUND IT");
                this.lists.splice(i, 1);
                this.storage.set('lists', JSON.stringify(this.lists));
                break;
          }


    }
 }

 loadListItems(name){
    var i;
    for(i = 0; i < this.lists.length; i++){
        if(this.lists[i].name === name){
           this.currentList = this.lists[i];
           //this.currentListIndex = i;
           this.updateLists();
           break;
        }
    }
 }


updateLists(){
    var i;
    for(i = 0; i < this.lists.length; i++){
        if(this.currentList.name === this.lists[i].name){
            this.lists[i] = this.currentList;
            this.storage.set('lists', JSON.stringify(this.lists));
            console.log("lists updated");
            break;
        }
    }

}

/*
 updateLists(){
    this.lists[this.currentListIndex] = this.currentList;
    this.storage.set('lists', JSON.stringify(this.lists));
    console.log("lists updated in storage");

 }
 */

 addItem(item, price){
    if(price === ''){
      price = '0.00'
    }
    this.currentList.items.push({name: item, price: parseFloat(price).toFixed(2), checked: false});
    this.updateLists();
 }

 removeItem(item){
    var i;
    for(i = 0; i < this.currentList.items.length; i++){
        if(item === this.currentList.items[i].name){
            this.currentList.items.splice(i, 1);
            this.updateLists();
            break;
        }

    }



     }

 toggleFavorite(){
    this.currentList.favorite = !this.currentList.favorite;
    this.updateLists();
    console.log(this.currentList.favorite);
 }

 showInvalidNameAlert() {
   let alert = this.alertCtrl.create({
     title: 'Invalid Name',
     subTitle: 'Please enter a valid list name',
     buttons: ['OK']
   });
   alert.present();
 }

 doesListExist(name){
   var i;
   for(i = 0; i < this.lists.length; i++){
     if(this.lists[i].name === name){
       console.log("list exists");
       return true;
     }

   }
   return false;
 }

isItemInList(item){
  var i;
  for(i = 0; i < this.currentList.items.length; i++){
    if(this.currentList.items[i].name === item){
      return true;
    }

  }
  return false;
}

 clearAllLists(){
     this.lists = [];
     this.favoriteLists = [];
     this.currentList = {name: '', items:[], favorite:false};
     this.storage.clear();


 }

 getTotal(){
   var i;
   var total = 0;
   for(i = 0; i < this.currentList.items.length; i++){
     total = total + parseFloat(this.currentList.items[i].price);
   }

   return total.toFixed(2);
 }

}
