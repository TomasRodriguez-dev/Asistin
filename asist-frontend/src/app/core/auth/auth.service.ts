import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.desa';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authenticated: boolean = false;
    SignInService: any;

    constructor(
        private _httpClient: HttpClient,
        private router: Router
    ) {}

    /**
     * Setter & getter for access token localStorage
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    canActivate(): boolean {
        return this.SignInService.isAuthenticated();
    }

    /**
     * Iniciar sesión
     *
     * @param credentials
     */
    signIn(credentials: {email: string, password: string}): Observable<any> {

        return this._httpClient.post(`${environment.auth.login}`, credentials).pipe(
            switchMap((response: any) => {
                if (response.success) {
                    // Almacenar el token de acceso en el almacenamiento local
                    this.accessToken = response.token;

                    // Establecer el indicador de autenticación en verdadero
                    this._authenticated = true;

                    // Devolver un nuevo observable con la respuesta
                    return of(response);
                } else {
                    // Si no hay éxito, lanzar un error
                    return throwError("Inicio de sesión fallido");
                }
            })
        );
    }

    /**
     * Cerrar sesión
     */
    signOut(): Observable<any> {
        // Eliminar el token de acceso del almacenamiento local
        localStorage.clear();
        // Establecer el indicador de autenticación en falso
        this._authenticated = false;
        // Redireccionar inicio
        this.router.navigate(['/']);
        // Devolver el observable
        return of(true);
    }

    check(): Observable<boolean> {
        // Comprobar si el usuario ha iniciado sesión
        if (this._authenticated) {
            return of(true);
        }

        // Comprobar la disponibilidad del token de acceso
        if (!this.accessToken) {
            return of(false);
        }

        // Si el token de acceso existe y no ha caducado, iniciar sesión con él
        return of(true);
    }
}