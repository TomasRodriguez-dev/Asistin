import { Component } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    standalone: true,
    imports: [IonIcon, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet],
})
export class TabsComponent {
}