import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Materia {
    idMateria: number;
    nombre: string;
    horario: string;
    curso: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
    materias: Materia[] = [
        { idMateria: 1, nombre: "Biología", horario: "10:00 - 11:00", curso: "3ro 1ra" },
        { idMateria: 2, nombre: "Matemática", horario: "11:00 - 12:00", curso: "3ro 1ra" },
        { idMateria: 3, nombre: "Ciencias Sociales", horario: "12:00 - 13:00", curso: "3ro 1ra" },
        { idMateria: 4, nombre: "Dibujo Técnico", horario: "13:00 - 14:00", curso: "3ro 1ra" },
    ]
    constructor(private router: Router) { }

    verMateria(idMateria: number) {
        console.log("idMateria:", idMateria)
        this.router.navigate([`/tabs/materia/${idMateria}`])
    }
}