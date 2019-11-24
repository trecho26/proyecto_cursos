import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GerenciaPageRoutingModule } from "./gerencia-routing.module";

import { GerenciaPage } from "./gerencia.page";
import { PopinfoComponent } from "src/app/components/popinfo/popinfo.component";

@NgModule({
  entryComponents: [PopinfoComponent],
  imports: [CommonModule, FormsModule, IonicModule, GerenciaPageRoutingModule],
  declarations: [GerenciaPage, PopinfoComponent]
})
export class GerenciaPageModule {}
