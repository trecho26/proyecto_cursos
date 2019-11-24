import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciaPage } from './gerencia.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciaPageRoutingModule {}
