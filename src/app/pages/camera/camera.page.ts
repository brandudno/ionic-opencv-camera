import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { CameraPreviewService } from 'src/app/services/camera-preview.service';
import { Network } from '@ionic-native/network/ngx';
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
    private router: Router,
    private network: Network
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.startCamera();
    setTimeout(() => {
      this.cameraReady = true;
    }, 1000);
  }

  ionViewWillLeave() {
    this.cameraService.stopCamera().subscribe();
    this.cameraReady = false;
  }

  public checkNetwork(): void {
    if(this.network.type == "none") alert("Warning: You have no network connection");
  }

  public startCamera(): void {
    this.checkNetwork();
    this.cameraService.startCamera().subscribe(() => {
      this.cameraService.turnFlashOn().subscribe();
    });
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
