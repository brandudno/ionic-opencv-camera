import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { CameraPreviewService } from 'src/app/services/camera-preview.service';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { ResultsService } from 'src/app/services/results.service';
import { _ } from 'underscore';
import { StorageService } from 'src/app/services/storage.service';

declare var cv: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  public processingImage: Boolean = false;
  public cameraReady: Boolean = false;
  public takenImage: String;

  constructor(
    private cameraService: CameraPreviewService,
    private network: Network,
    private resultsService: ResultsService,
    private router: Router,
    private storageService: StorageService
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

    setInterval(() => {
      this.takePicture();
    }, 200);
  }

  public takePicture(): void {
    this.cameraService.takePicture().subscribe((imageData) => {
      const element = document.createElement('img');
      element.src = 'data:image/jpg;base64,' + imageData;

      setTimeout(() => {
        this.processImageAnalysis(element);
      }, 1000);
    });
  }

  private processImageAnalysis(element) {
    var src = cv.imread(element);
    var copy = src.clone();
    let dst = new cv.Mat();
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    let color = new cv.Scalar(0, 255, 0);
    cv.cvtColor(src, src, cv.COLOR_BGR2GRAY, 0);
    cv.bilateralFilter(src, dst, 7, 50, 50, cv.BORDER_DEFAULT);
    cv.Canny(dst, dst, 8, 250, 3, false);
    cv.findContours(dst, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
    cv.cvtColor(dst, src, cv.COLOR_GRAY2BGR, 0);
    for (let i = 0; i < contours.size(); ++i) {
      let cnt = contours.get(i);
      let area = cv.contourArea(cnt, false);
      console.log(area);
      if (area > 2000) {
        cv.drawContours(src, contours, i, color, 1, cv.LINE_8, hierarchy, 1);
      }
    }
    cv.imshow('canvasOutput', src);
    src.delete(); dst.delete();
  }

  // public takePicture(): void {
  //   this.processingImage = true;

  //   this.cameraService.takePicture().subscribe((imageData) => {
  //     this.processingImage = false;
  //     this.cameraReady = false;
      
  //     this.postResults(imageData);
  //   }, (err) => {
  //     this.processingImage = false;
  //     alert("Something went wrong, please try again");
  //   });
  // }

  public postResults(imageData: String[]): void {
    _.map(imageData, (image) => {
      console.log(image);
      this.resultsService.postResults(image).subscribe((imageResults) => {
        this.storageService.storeResults(imageResults).subscribe(() => {
          this.router.navigateByUrl('/results');
        });
      })
    });
  }
}
