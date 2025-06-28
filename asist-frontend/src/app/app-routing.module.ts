import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/noAuth.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Rutas Publicas
  {
    path: '',
    loadChildren: () => import('./modules/splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
    ]
  },
  // Rutas Privadas
  {
    path: 'tabs',
    loadComponent: () => import('./modules/tabs/tabs.component').then(m => m.TabsComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
