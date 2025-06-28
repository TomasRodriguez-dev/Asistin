import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DarkModeToggleComponent } from 'src/app/shared/components/darkModeToggle/dark-mode-toggle.component';
import { AlertService } from 'src/app/shared/services/alert.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        DarkModeToggleComponent
    ],
    declarations: [AuthComponent, SignInComponent, SignUpComponent],
    providers: [AuthService, AlertService]
})
export class AuthModule {}
