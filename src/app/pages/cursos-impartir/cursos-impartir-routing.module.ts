import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosImpartirPage } from './cursos-impartir.page';

const routes: Routes = [
  {
    path: '',
    component: CursosImpartirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosImpartirPageRoutingModule {}
