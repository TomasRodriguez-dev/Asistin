import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);

    // Clone the request object
    let newReq = req.clone();

    // Request
    if (authService.accessToken) {
        newReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
        });
    }

    // Response
    return next(newReq).pipe(
        catchError((error) => {
            // Capta errores desconocidos
            if (error.status === 0) {
                authService.signOut();
                location.reload();
                return throwError(() => new Error('Token expirado u inexistente'));
            }

            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse && error.status === 401) {
                authService.signOut();
                location.reload();
                return throwError(() => new Error('Credenciales invalidas.'));
            }

            // Capta errores desconocidos
            if (error.status === 500) {
                return throwError(() => new Error('Error interno del servidor'));
            }

            if (error instanceof HttpErrorResponse && error.status === 404) {
                return throwError(() => new Error('Error en persistencia'));
            }

            // If none of the above conditions are met, return an observable that emits an error
            return throwError(() => new Error('Error desconocido'));
        }),
    );
};