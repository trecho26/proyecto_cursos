import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UsuarioPageRoutingModule } from "./usuario-routing.module";

import { UsuarioPage } from "./usuario.page";
import { MenuComponent } from "src/app/components/menu/menu.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UsuarioPageRoutingModule],
  declarations: [UsuarioPage, MenuComponent]
})
export class UsuarioPageModule {}
