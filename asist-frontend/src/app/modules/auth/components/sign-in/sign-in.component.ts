import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss'],
    standalone: false,
})
export class SignInComponent implements OnInit {
    form!: FormGroup;
    isLoading = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private _authService: AuthService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.newForm();
    }

    newForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })
    }

    iniciarSesion() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.alertService.presentToast('Complete los campos requeridos(*)', 3000, 'danger', 'top');
            return;
        }

        this.isLoading = true;  // Inicia el spinner

        const payload = {
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value
        };

        this._authService.signIn(payload).subscribe({
            next: response => {
                this.alertService.presentToast(response.message, 3000, 'success', 'top', 'text-white');
                this.router.navigate(['/tabs/inicio']);
            },
            error: err => {
                this.form.markAllAsTouched();
                this.form.get('email')?.setErrors({ credentials: true });
                this.form.get('password')?.setErrors({ credentials: true });
                console.error(err);
                this.alertService.presentToast(err.error.message, 3000, 'danger', 'top');
            },
            complete: () => {
                this.isLoading = false;  // Detiene el spinner al terminar
            }
        });
    }

    navigateSignUp(){
        this.router.navigate(['/auth/sign-up']);
    }
}