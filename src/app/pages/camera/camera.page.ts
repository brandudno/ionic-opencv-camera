import { Component, OnInit } from '@angular/core';
import { CameraPreviewService } from 'src/app/services/camera-preview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(
    private cameraService: CameraPreviewService,
    private router: Router
  ) { }

  ngOnInit() {
    this.startCamera();
  }

  public startCamera(): void {
    this.cameraService.startCamera().subscribe();
  }

  public takePicture(): void {
    this.cameraService.takePicture().subscribe((imageData) => {
      console.log('data:image/jpeg;base64,' + imageData);
      this.router.navigate(['/results']);
    }, (err) => {
      console.log(err);
    });
  }
}
