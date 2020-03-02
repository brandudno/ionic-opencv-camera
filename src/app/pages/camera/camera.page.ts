import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { CameraPreviewService } from 'src/app/services/camera-preview.service';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { ResultsService } from 'src/app/services/results.service';
import { _ } from 'underscore';
import { StorageService } from 'src/app/services/storage.service';
import { Platform } from '@ionic/angular';

declare var cv: any;
declare var cordova;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  public processingImage: Boolean = false;
  public cameraReady: Boolean = false;
  public takenImage: String;
  public videoSrc;

  constructor(
    private cameraService: CameraPreviewService,
    private network: Network,
    private resultsService: ResultsService,
    private router: Router,
    private storageService: StorageService,
    private platform: Platform
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
    // this.cameraService.stopCamera().subscribe();
    this.cameraReady = false;
  }

  public checkNetwork(): void {
    if(this.network.type == "none") alert("Warning: You have no network connection");
  }

  public async startCamera() {
    this.checkNetwork();
    
    const videoConstraints = { 
      audio: false, 
      video: {
        facingMode: 'environment',
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },
      }
    };

    const video = document.querySelector('video');

    if (this.platform.is('ios') && this.platform.is('cordova')) {

      cordova.plugins.iosrtc.getUserMedia(videoConstraints).then((stream) => {
          video.srcObject = stream;

          setInterval(() => {
            this.processImageAnalysis(video);
          }, 100);
        }
      );

    } else {
      const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      video.srcObject = stream;

      setInterval(() => {
        this.processImageAnalysis(video);
      }, 100);
    }

    
  }

  // public takePicture(): void {
  //   this.cameraService.takePicture().subscribe((imageData) => {
  //     const element = document.createElement('img');
  //     element.src = 'data:image/jpg;base64,' + imageData;

  //     setTimeout(() => {
  //       this.processImageAnalysis(element);
  //     }, 200);
  //   });
  // }

  private processImageAnalysis(video) {
    var canvas = document.createElement('canvas');
    canvas.getContext('2d').drawImage(video, 0, 0, window.outerWidth, window.outerHeight);

    var src = cv.imread(canvas);
    let dst = new cv.Mat();

    cv.cvtColor(src, src, cv.COLOR_BGR2GRAY, 0);
    cv.bilateralFilter(src, dst, 7, 50, 50, cv.BORDER_DEFAULT);
    cv.Canny(src, dst, 8, 250, 3, false);

    cv.imshow('canvasOutput', dst);
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
