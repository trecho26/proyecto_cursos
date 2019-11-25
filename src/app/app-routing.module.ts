import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'curso/:id',
    loadChildren: () => import('./pages/curso/curso.module').then( m => m.CursoPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'gerencia',
    loadChildren: () => import('./pages/gerencia/gerencia.module').then( m => m.GerenciaPageModule)
  },
  {
    path: 'agregar-curso',
    loadChildren: () => import('./pages/agregar-curso/agregar-curso.module').then( m => m.AgregarCursoPageModule)
  },
  {
    path: 'cursos-impartir',
    loadChildren: () => import('./pages/cursos-impartir/cursos-impartir.module').then( m => m.CursosImpartirPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
