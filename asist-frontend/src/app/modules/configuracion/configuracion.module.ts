import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './components/configuracion.component';
import { IonicModule } from '@ionic/angular';
import { DarkModeToggleComponent } from 'src/app/shared/components/darkModeToggle/dark-mode-toggle.component';

@NgModule({
    declarations: [ConfiguracionComponent],
    imports: [
        CommonModule,
        ConfiguracionRoutingModule,
        IonicModule,
        DarkModeToggleComponent
    ]
})
export class ConfiguracionModule { }