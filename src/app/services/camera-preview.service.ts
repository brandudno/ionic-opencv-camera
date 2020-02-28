import { Injectable } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraPreviewService {

  constructor(
    private cameraPreview: CameraPreview
  ) { }

  public startCamera(): Observable<any> {
    const cameraPreviewOpts: CameraPreviewOptions = {
      camera: 'rear',
      tapPhoto: false,
      previewDrag: true,
      toBack: true,
      alpha: 1,
    }
    return from(this.cameraPreview.startCamera(cameraPreviewOpts));
  }

  public turnFlashOn(): Observable<any> {
    this.cameraPreview.setFlashMode("torch");
    return from(this.cameraPreview.getFlashMode());
  }

  public stopCamera(): Observable<any> {
    return from(this.cameraPreview.stopCamera());
  }

  public takePicture(): Observable<any> {
    const pictureOpts: CameraPreviewPictureOptions = {
      quality: 10
    };
    
    return from(this.cameraPreview.takeSnapshot(pictureOpts));
  }

}
