import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class PerfilComponent {
    @ViewChild('modal', { static: true }) modal!: IonModal;


    constructor(private authService: AuthService, private router: Router) {}

    cerrarModal() {
        this.modal.dismiss();
    }

    async confirmarCerrarSesion() {
        await this.authService.signOut();
        this.cerrarModal();
    }
}