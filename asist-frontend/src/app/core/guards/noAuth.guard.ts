import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.check().pipe(
            switchMap((authenticated) => {
                if (!authenticated) {
                    return of(true); // Se permite el acceso
                } else {
                    this.router.navigate(['/tabs/inicio']); // Redirigir a la página de inicio si ya está autenticado
                    return of(false); // Se denega el acceso
                }
            })
        );
    }
}