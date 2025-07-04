import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeRoutingModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {}