import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.desa';

@Injectable({
    providedIn: 'root'
})
export class MateriaService {

    constructor(private http: HttpClient) {

    }

    getValidLocations() {
        return this.http.get(environment.materias.valid_locations)
    }
    getCurrentUser() {
        return this.http.get(environment.user.get_user_profile)
    }
    registerAttendance(payload: any){
        return this.http.post(environment.materias.attendance, payload)
    }
}