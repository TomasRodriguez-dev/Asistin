import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './components/perfil.component';
import { IonicModule } from '@ionic/angular';
import { DarkModeToggleComponent } from 'src/app/shared/components/darkModeToggle/dark-mode-toggle.component';

@NgModule({
    declarations: [PerfilComponent],
    imports: [
        CommonModule,
        PerfilRoutingModule,
        IonicModule,
        DarkModeToggleComponent
    ]
})
export class PerfilModule { }