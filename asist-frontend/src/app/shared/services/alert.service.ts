import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(private toastController: ToastController) {}

    /**
     * Muestra un toast con mensaje y opciones configurables.
     * Último parámetro opcional: clase CSS adicional para estilos personalizados.
     */
    async presentToast(
        message: string,
        duration: number = 2000,
        color: string = 'primary',
        position: 'top' | 'middle' | 'bottom' = 'bottom',
        cssClass: string = ''
    ) {
        const toast = await this.toastController.create({
            message,
            duration,
            color,
            position,
            buttons: [
                {
                text: 'Cerrar',
                role: 'cancel',
                },
            ],
            cssClass: cssClass || 'custom-toast',
        });
        await toast.present();
    }
}
