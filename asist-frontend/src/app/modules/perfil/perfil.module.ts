import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './components/perfil.component';
import { IonicModule } from '@ionic/angular';
import { DarkModeToggleComponent } from 'src/app/shared/components/darkModeToggle/dark-mode-toggle.component';
import { PerfilService } from './service/perfil.service';
import { SavePerfilComponent } from './components/save-perfil/save-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectsService } from 'src/app/shared/services/selects.service';
import { ImageUploaderComponent } from 'src/app/shared/components/imageUploader/image-uploader.component';

@NgModule({
    declarations: [PerfilComponent, SavePerfilComponent],
    imports: [
        CommonModule,
        PerfilRoutingModule,
        IonicModule,
        DarkModeToggleComponent,
        FormsModule,
        ReactiveFormsModule,
        ImageUploaderComponent
    ],
    providers: [PerfilService, SelectsService]
})
export class PerfilModule { }