import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class ImageUploaderComponent {
    constructor(private actionSheetCtrl: ActionSheetController){}

    imageUrl?: string;

    @Output() imageCaptured = new EventEmitter<Blob>();

    async takePhoto(): Promise<void> {
        await this.capture(CameraSource.Camera);
    }

    async chooseFromGallery(): Promise<void> {
        await this.capture(CameraSource.Photos);
    }

    private async capture(source: CameraSource): Promise<void> {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: source
            });

            if (!image?.dataUrl) throw new Error('No se obtuvo imagen');

            this.imageUrl = image.dataUrl;

            const blob = this.dataUrlToBlob(image.dataUrl);
            this.imageCaptured.emit(blob);
        } catch (err) {
            console.error('Error capturando imagen:', err);
        }
    }

    private dataUrlToBlob(dataUrl: string): Blob {
        const [metadata, base64] = dataUrl.split(',');
        const mimeMatch = metadata.match(/data:(.*?);base64/);
        const mime = mimeMatch?.[1] || 'image/jpeg';

        const binary = atob(base64);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }

        return new Blob([array], { type: mime });
    }

    async openImageSourceSelector() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Selecciona una opción',
            buttons: [
            {
                text: 'Tomar foto',
                icon: 'camera',
                handler: () => {
                this.takePhoto();
                }
            },
            {
                text: 'Elegir de galería',
                icon: 'images',
                handler: () => {
                this.chooseFromGallery();
                }
            },
            {
                text: 'Cancelar',
                icon: 'close',
                role: 'cancel'
            }
            ]
        });

        await actionSheet.present();
    }
}