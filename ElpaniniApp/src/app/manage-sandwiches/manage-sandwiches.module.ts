import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSandwichesPageRoutingModule } from './manage-sandwiches-routing.module';

import { ManageSandwichesPage } from './manage-sandwiches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSandwichesPageRoutingModule
  ],
  declarations: [ManageSandwichesPage]
})
export class ManageSandwichesPageModule {}
