import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosImpartirPageRoutingModule } from './cursos-impartir-routing.module';

import { CursosImpartirPage } from './cursos-impartir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosImpartirPageRoutingModule
  ],
  declarations: [CursosImpartirPage]
})
export class CursosImpartirPageModule {}
