import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CursosPageRoutingModule } from "./cursos-routing.module";

import { CursosPage } from "./cursos.page";
import { Menu2Component } from "src/app/components/menu2/menu2.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CursosPageRoutingModule],
  declarations: [CursosPage, Menu2Component]
})
export class CursosPageModule {}
