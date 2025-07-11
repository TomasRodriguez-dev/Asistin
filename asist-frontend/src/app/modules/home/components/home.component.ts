import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AlertService } from 'src/app/shared/services/alert.service';

interface Materia {
    "id": number;
    "dayOfWeek": number;
    "startTime": string;
    "endTime": string;
    "idsubject": number;
    "idlocation": number;
    "subject": {
        "id": number,
        "name": string,
        "description": string,
    }
}

interface User {
    "id": number | null,
    "email": string | null,
    "firstName": string | null,
    "lastName": string | null,
    "avatarUrl": string | null,
    "phoneNumber": string | null,
    "idgender": number | null,
    "createdAt": string | null,
    "updatedAt": string | null
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
    materias: Materia[] = [];
    showSpinner: boolean = true;
    loggedUser: User = {
        "id": null,
        "email": null,
        "firstName": null,
        "lastName": null,
        "avatarUrl": null,
        "phoneNumber": null,
        "idgender": null,
        "createdAt": null,
        "updatedAt": null
    };
    constructor(private router: Router, private homeService: HomeService, private alert: AlertService) { }

    ngOnInit(): void {
        this.getMaterias();
        this.getLoggedUser();

    }

    getLoggedUser() {
        this.homeService.getLoggedUser().subscribe({
            next: (res: any) => {
                if(res.success == true){
                    this.loggedUser = res.result;
                } else {
                    this.alert.presentToast('Ocurrió un error al obtener el usuario logueado', 3000, 'danger', 'top')
                }
            }
        })
    }

    getMaterias() {
        this.homeService.getMaterias().subscribe({
            next: (res: any) => {
                if (res.success == true) {
                    this.materias = res.result;
                    this.showSpinner = false;
                }
            }
        })
    }

    verMateria(idMateria: number) {
        console.log("idMateria:", idMateria)
        this.router.navigate([`/tabs/materia/${idMateria}`])
    }
}