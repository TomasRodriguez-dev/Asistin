import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from '../services/materia.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation'
import { AlertService } from 'src/app/shared/services/alert.service';

interface User {
  "id": number | null,
  "idrole": number | null,
  "email": string | null,
  "firstName": string | null,
  "lastName": string | null,
  "avatarUrl": string | null,
  "phoneNumber": string | null,
  "idgender": number | null,
  "createdAt": string | null,
  "updatedAt": string | null
}

interface Location { latitud: string, longitud: string }

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss'],
  standalone: false
})
export class MateriaComponent implements OnInit {
  idMateria: number = Number(this.route.snapshot.url[0].path);
  usuarioLogueado: User = {
    "id": null,
    "idrole": null,
    "email": null,
    "firstName": null,
    "lastName": null,
    "avatarUrl": null,
    "phoneNumber": null,
    "idgender": null,
    "createdAt": null,
    "updatedAt": null
  };
  asistenciasAlumnos: any;
  showSpinner = false;
  base64Image: string = '';
  validLocations: Location[] = [{ latitud: '-38.92', longitud: '-67.97' }, { latitud: '-38.93', longitud: '-68.11' }];
  currentLocation: any

  constructor(private route: ActivatedRoute, private materiaService: MateriaService, private alert: AlertService) { }

  ngOnInit() {
    this.getCurrentLocation();
    this.getCurrentUser().then((value) => {
      this.getData(this.usuarioLogueado.idrole).then((value) => {
        this.showSpinner = false;
      })
    });
  }

  getCurrentUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.showSpinner = true;
      this.materiaService.getCurrentUser().subscribe({
        next: (res: any) => {
          if (res.success == true) {
            this.usuarioLogueado = res.result;
            resolve();
          }
        }
      })
    })
  }

  getData(idrole: number | null): Promise<void> {
    return new Promise((resolve, reject) => {
      if (idrole == 2) {

      } else {
        resolve();
      }
    })
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition().then((value) => {
      let latitude = value.coords.latitude
      let longitude = value.coords.longitude

      this.currentLocation = {
        latitud: latitude,
        longitud: longitude
      }
    })

  }

  async marcarPresente() {
    this.currentLocation = {latitud: this.currentLocation.latitud.toFixed(2), longitud: this.currentLocation.longitud.toFixed(2)};

    console.log(this.currentLocation)
    if (this.base64Image != '' && this.validLocations.includes(this.currentLocation)) {
      let hoy = new Date()
      let dateFormat = `${hoy.getFullYear()}-${hoy.getMonth}-${hoy.getDay}`
      let timeFormat = `${hoy.getHours}:${hoy.getMinutes}`
      let payload = {
        "date": dateFormat,
        "time": timeFormat,
        "type": "entrada",
        "latitude": this.currentLocation.latitud,
        "longitude": this.currentLocation.longitud,
        "photoUrl": this.base64Image,
        "idsubject": this.idMateria
      }
      this.materiaService.registerAttendance(payload).subscribe({
        next: (res: any) => {
          alert(res)
          //this.alert.presentToast('Asistencia', 3000, 'success', 'top')
        }
      })
    } else {
      if (this.validLocations.includes(this.currentLocation) == false) {
        this.alert.presentToast('No se encuentra en una ubicación permitida', 3000, 'danger', 'top')
      }
      if (this.base64Image == '' || this.base64Image == undefined || this.base64Image == null) {
        this.alert.presentToast('Debe tomar una foto para cargar la asistencia', 3000, 'danger', 'top')
      }
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false, // Desactiva el editor de imágenes
      resultType: CameraResultType.Base64, // Te recomiendo Base64 para subir directamente a Firebase Storage
      source: CameraSource.Camera // Fuerza a usar la cámara directamente
    });

    this.base64Image = 'data:image/jpeg;base64,' + image.base64String;
  }

}
