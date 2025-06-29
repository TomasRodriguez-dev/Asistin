import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);

    let newReq = req.clone();

    if (authService.accessToken) {
        newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
        });
    }

    return next(newReq).pipe(
        catchError((error: HttpErrorResponse) => {
        // Excluir 400 (Bad Request)
        if (error.status === 400) {
            return throwError(() => error);
        }

        if (error.status === 0) {
            return throwError(() => new Error('Token expirado u inexistente'));
        }

        if (error.status === 401) {
            authService.signOut();
            location.reload();
            return throwError(() => new Error('Credenciales inválidas.'));
        }

        if (error.status === 404) {
            return throwError(() => new Error('Error en persistencia'));
        }

        if (error.status === 500) {
            return throwError(() => new Error('Error interno del servidor'));
        }

        return throwError(() => new Error('Error desconocido'));
        })
    );
};
