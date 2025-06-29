import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { environment } from 'src/environments/environment.desa';

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private storage = getStorage(initializeApp(environment.firebase));

    constructor(
        private httpClient: HttpClient
    ) { }

    getUserPerfil() {
        return this.httpClient.get<any>(`${environment.user.get_user_profile}`);
    }

    editarUserPerfil(data: any) {
        return this.httpClient.patch<any>(`${environment.user.editar_user_profile}`, data);
    }

    async subirAvatar(file: File, userId: number): Promise<string> {
        const fileName = `avatar_${Date.now()}_${file.name}`;
        const storageRef = ref(this.storage, `avatars/${userId}/${fileName}`);

        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    }

    avatarUserPerfil(url: string) {
        return this.httpClient.patch<any>(`${environment.user.avatar_user_profile}`, { url });
    }
}