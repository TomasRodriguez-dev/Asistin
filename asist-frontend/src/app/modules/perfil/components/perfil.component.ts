import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PerfilService } from '../service/perfil.service';
import { IUserProfile } from '../model/perfil.model';
import { environment } from 'src/environments/environment.desa';
import { filter } from 'rxjs';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {
    @ViewChild('modal', { static: true }) modal!: IonModal;
    avatarUrl: string | null = null; 
    userProfile!: IUserProfile; 

    constructor(
        private authService: AuthService,
        private router: Router,
        private perfilService: PerfilService,
    ) {}

    ngOnInit(): void {
        this.getUserPerfil();
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
            ).subscribe((event: NavigationEnd) => {
            if (event.urlAfterRedirects === '/tabs/perfil') { 
                this.getUserPerfil();
            }
        });
    }

    ionViewWillEnter() {
        this.getUserPerfil();
    }

    getUserPerfil(){
        this.perfilService.getUserPerfil().subscribe({
            next: (resp) => {
                this.userProfile = resp.result;
                this.avatarUrl = (`${environment.baseRest}${this.userProfile.avatarUrl}`) || null;
            },
            error: (err) => {
                console.error('Error al obtener el perfil:', err);
            }
        })
    }

    editPerfil(){
        this.router.navigate(['./tabs/perfil/edit-perfil'])
    }

    get fullName(): string {
        return `${this.userProfile?.firstName || ''} ${this.userProfile?.lastName || ''}`.trim();
    }

    get isLongName(): boolean {
        return this.fullName.length > 20;
    }


    // Modal Cerrar Sesion
    cerrarModal() {
        this.modal.dismiss();
    }

    async confirmarCerrarSesion() {
        await this.authService.signOut();
        this.cerrarModal();
    }
}