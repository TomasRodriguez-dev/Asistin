import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.desa';
import { IApiResponse } from '../model/api-responde.model';
import { IGenero } from '../model/selects.model';

@Injectable({
    providedIn: 'root'
})
export class SelectsService {
    constructor(private httpClient: HttpClient) { }

    getGeneros(): Observable<IApiResponse<IGenero[]>>{
        return this.httpClient.get<IApiResponse<IGenero[]>>(`${environment.select.generos}`);
    }
}