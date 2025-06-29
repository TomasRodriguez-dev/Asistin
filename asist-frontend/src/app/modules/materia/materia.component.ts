import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface asistenciaAlumno {
  estado: string;
  alumno: string;
}

interface User {
  nombre: string;
  rol: string;
}

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss'],
  standalone: false
})
export class MateriaComponent  implements OnInit {
  idMateria: number = Number(this.route.snapshot.url[0].path);
  usuarioLogueado: User = 
  { nombre: "Valentino Valdebenito", rol: "Alumno"}
  //{ nombre: "Valentino Valdebenito", rol: "Profesor"}

  asistenciasAlumnos: asistenciaAlumno[] = [
    {estado: "presente", alumno: "Valentino Valdebenito"},
    {estado: "ausente", alumno: "Jerónimo Huincaman"},
    {estado: "tarde", alumno: "Lucas Di Luca"},
    {estado: "presente", alumno: "Tomás Rodriguez"},
  ]

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  marcarPresente(){
    alert("Marcar Presente")
  }

}
