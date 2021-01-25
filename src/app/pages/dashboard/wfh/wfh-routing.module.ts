import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WfhPage } from './wfh.page';

const routes: Routes = [
  {
    path: '',
    component: WfhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WfhPageRoutingModule {}
