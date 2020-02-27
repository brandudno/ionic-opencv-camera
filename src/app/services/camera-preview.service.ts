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
      alpha: 1
    }

    return from(this.cameraPreview.startCamera(cameraPreviewOpts));
  }

  public stopCamera(): Observable<any> {
    return from(this.cameraPreview.stopCamera());
  }

  public takePicture(): Observable<any> {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    };
    
    return from(this.cameraPreview.takePicture(pictureOpts));
  }

}
