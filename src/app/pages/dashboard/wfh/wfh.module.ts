import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WfhPageRoutingModule } from './wfh-routing.module';

import { WfhPage } from './wfh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WfhPageRoutingModule
  ],
  declarations: [WfhPage]
})
export class WfhPageModule {}
