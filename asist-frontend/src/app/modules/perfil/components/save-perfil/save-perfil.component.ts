import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IUserProfile } from '../../model/perfil.model';
import { PerfilService } from '../../service/perfil.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { SelectsService } from 'src/app/shared/services/selects.service';
import { IGenero } from 'src/app/shared/model/selects.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { environment } from 'src/environments/environment.desa';
import { ImageUploaderComponent } from 'src/app/shared/components/imageUploader/image-uploader.component';

@Component({
    selector: 'app-save-perfil',
    templateUrl: './save-perfil.component.html',
    styleUrls: ['./save-perfil.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class SavePerfilComponent {
    @ViewChild('modal', { static: true }) modal!: IonModal;
    @ViewChild('uploader') uploader?: ImageUploaderComponent;
    avatarUrl: string | null = null; 
    userProfile!: IUserProfile; 
    generos: IGenero[] = [];
    form!: FormGroup;
    isSelectOpen = false;
    isLoading = false;
    isUploadLoading = false;

    constructor(
        private perfilService: PerfilService,
        private router: Router,
        private formBuilder: FormBuilder,
        private selectsService: SelectsService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.newForm();
        this.getUserPerfil();
        this.getGeneros();
    }

    newForm(){
        this.form = this.formBuilder.group({
            nombre: [''],
            apellido: [''],
            genero: [null],
            telefono: [''],
            email: [''],
        })
    }

    getUserPerfil(){
        this.perfilService.getUserPerfil().subscribe({
            next: (resp) => {
                this.userProfile = resp.result;
                this.avatarUrl = this.userProfile.avatarUrl || null;
                this.form.patchValue({
                    nombre: this.userProfile.firstName,
                    apellido: this.userProfile.lastName,
                    genero: this.userProfile.idgender,
                    telefono: this.userProfile.phoneNumber,
                    email: this.userProfile.email
                })
            },
            error: (err) => {
                console.error('Error al obtener el perfil:', err);
            }
        })
    }

    getGeneros() {
        this.selectsService.getGeneros().subscribe({
            next: (resp) => {
                this.generos = resp.result;
            },
            error: (err) => {
                console.error('Error al obtener los géneros:', err);
            }
        });
    }

    goBack(){
        this.router.navigate(['./tabs/perfil'])
    }

    onEditarAvatar() {
        this.uploader?.openImageSourceSelector();
    }

    async onAvatarCaptured(blob: Blob) {
        if (blob.size > 5 * 1024 * 1024) {
            this.alertService.presentToast('La imagen supera el límite de 5MB', 3000, 'danger', 'top', 'text-white');
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(blob.type)) {
            this.alertService.presentToast('Solo se permiten imágenes JPG o PNG', 3000, 'danger', 'top', 'text-white');
            return;
        }

        this.isUploadLoading = true;

        try {
            const userId = this.userProfile.id;
            const file = new File([blob], `avatar_${Date.now()}.jpg`, { type: blob.type });

            const firebaseUrl = await this.perfilService.subirAvatar(file, userId);

            await this.perfilService.avatarUserPerfil(firebaseUrl).toPromise();

            this.alertService.presentToast('Avatar actualizado correctamente', 3000, 'success', 'top', 'text-white');
            this.getUserPerfil();
        } catch (err: any) {
            console.error('Error al actualizar avatar:', err);
            this.alertService.presentToast(err?.error?.message || 'Error al actualizar el avatar', 3000, 'danger', 'top', 'text-white');
        } finally {
            this.isUploadLoading = false;
        }
    }

    onSubmit(){
        this.isLoading = true;
        const formValue = this.form.value;
        const payload: any = {};

        if (formValue.nombre) payload.firstName = formValue.nombre;
        if (formValue.apellido) payload.lastName = formValue.apellido;
        if (formValue.genero) payload.idgender = formValue.genero;
        if (formValue.telefono != null && formValue.telefono !== '') {
            payload.phoneNumber = String(formValue.telefono);
        }
        if (formValue.email) payload.email = formValue.email;
        this.perfilService.editarUserPerfil(payload).subscribe({
            next: (resp) => {
                this.isLoading = false;
                this.alertService.presentToast('Perfil actualizado correctamente', 3000, 'success', 'top', 'text-white');
                this.modal.dismiss();
                this.router.navigate(['./tabs/perfil']);
            },
            error: (err) => {
                this.isLoading = false;
                this.alertService.presentToast(err.error.message || 'Error al actualizar el perfil', 3000, 'danger', 'top', 'text-white');
                this.modal.dismiss();
                console.error('Error al actualizar el perfil:', err);
            }
        });
    }

    onSelectClose(): void {
        this.isSelectOpen = false;
    }

    // Abrir Modal
    abrirModal() {
        this.modal.present();
    }

    // Cerrar Modal
    cerrarModal() {
        this.modal.dismiss();
    }
}