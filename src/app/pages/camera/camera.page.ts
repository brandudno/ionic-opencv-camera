import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { CameraPreviewService } from 'src/app/services/camera-preview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  public processingImage: Boolean = false;
  public cameraReady: Boolean = false;

  constructor(
    private cameraService: CameraPreviewService,
    private router: Router
  ) { }

  ngOnInit() {
    this.startCamera();
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.cameraReady = true;
    }, 1000);
  }

  ionViewWillLeave() {
    this.cameraReady = false;
  }

  public startCamera(): void {
    this.cameraService.startCamera().subscribe();
  }

  public takePicture(): void {
    this.processingImage = true;

    this.cameraService.takePicture().subscribe((imageData) => {
      this.processingImage = false;
      this.cameraReady = false;
      console.log('data:image/jpeg;base64,' + imageData);
      this.router.navigate(['/results']);
    }, (err) => {
      this.processingImage = false;
      console.log(err);
    });
  }
}
