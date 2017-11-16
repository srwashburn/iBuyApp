import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayListPage } from './display-list';

@NgModule({
  declarations: [
    DisplayListPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayListPage),
  ],
})
export class DisplayListPageModule {}
