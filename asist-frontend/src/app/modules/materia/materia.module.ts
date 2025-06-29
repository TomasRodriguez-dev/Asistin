import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MateriaRoutingModule } from './materia-routing.module';
import { MateriaComponent } from './materia.component';

@NgModule({
    declarations: [MateriaComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MateriaRoutingModule
    ],
    providers: [],
})
export class MateriaModule { }