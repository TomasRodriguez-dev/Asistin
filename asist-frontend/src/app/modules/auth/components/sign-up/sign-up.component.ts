import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss'],
    standalone: false,
})
export class SignUpComponent {

    constructor(
        private router: Router
    ) {}

    navigateSignIn(){
        this.router.navigate(['/auth/sign-in']);
    }
}