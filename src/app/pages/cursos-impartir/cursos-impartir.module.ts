import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CursosImpartirPageRoutingModule } from "./cursos-impartir-routing.module";

import { CursosImpartirPage } from "./cursos-impartir.page";
import { ModalComponent } from "src/app/components/modal/modal.component";

@NgModule({
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosImpartirPageRoutingModule
  ],
  declarations: [CursosImpartirPage, ModalComponent]
})
export class CursosImpartirPageModule {}
