import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenPage } from './components/splash-screen.component';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplashScreenPageRoutingModule {}
