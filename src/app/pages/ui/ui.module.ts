import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiPageRoutingModule } from './ui-routing.module';

import { UiPage } from './ui.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UiPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UiPage]
})
export class UiPageModule {}
