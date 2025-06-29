import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.desa';

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getUserPerfil() {
        return this.httpClient.get<any>(`${environment.user.get_user_profile}`);
    }

    editarUserPerfil(data: any) {
        return this.httpClient.patch<any>(`${environment.user.editar_user_profile}`, data);
    }

    avatarUserPerfil(formData: FormData) {
        return this.httpClient.post<any>(`${environment.user.avatar_user_profile}`, formData);
    }
}