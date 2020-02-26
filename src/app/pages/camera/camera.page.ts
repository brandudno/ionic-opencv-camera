import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(
    private cameraPreview: CameraPreview,
    private screenOrientation: ScreenOrientation
  ) { }

  ngOnInit() {
    this.startCamera();
  }

  public startCamera(): void {
    const cameraPreviewOpts: CameraPreviewOptions = {
      camera: 'rear',
      tapPhoto: false,
      previewDrag: true,
      toBack: true,
      alpha: 1
    }

    this.cameraPreview.startCamera(cameraPreviewOpts);
  }

  public takePicture(): void {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      console.log('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log(err);
    });
  }
}
