import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.desa';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(private http: HttpClient) {

    }

    getMaterias() {
        return this.http.get(environment.materias.materias_alumnos);
    }

    getLoggedUser() {
        return this.http.get(environment.user.get_user_profile)
    }
}