import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSandwichesPage } from './manage-sandwiches.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSandwichesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSandwichesPageRoutingModule {}
