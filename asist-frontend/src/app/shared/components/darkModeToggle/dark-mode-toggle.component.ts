import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-dark-mode-toggle',
    templateUrl: './dark-mode-toggle.component.html',
    styleUrls: ['./dark-mode-toggle.component.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class DarkModeToggleComponent implements OnInit {
    isDarkMode = false;
    isAnimating = false;

    ngOnInit() {
        const dark = localStorage.getItem('theme') === 'dark';
        this.isDarkMode = dark;
        this.updateDarkClass();
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;

        // Trigger animation
        this.isAnimating = false;
        setTimeout(() => {
            this.isAnimating = true;
        }, 10);

        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
        this.updateDarkClass();
    }

    updateDarkClass() {
        document.documentElement.classList.toggle('dark', this.isDarkMode);
    }
}