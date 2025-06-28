import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: 'splash-screen.component.html',
  styleUrls: ['splash-screen.component.scss'],
  standalone: false,
})
export class SplashScreenPage implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const splashScreen = document.querySelector('.splash-screen');
      if (splashScreen) {
        splashScreen.classList.add('fade-out');
      }
      setTimeout(() => {
        this.router.navigate(['/auth/sign-in']);
      }, 500); 
    }, 3000);
  }
}
