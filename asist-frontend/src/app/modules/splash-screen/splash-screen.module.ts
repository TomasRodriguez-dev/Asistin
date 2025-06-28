import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SplashScreenPageRoutingModule } from './splash-screen-routing.module';
import { SplashScreenPage } from './components/splash-screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashScreenPageRoutingModule,
  ],
  declarations: [SplashScreenPage]
})
export class SplashScreenPageModule {}
