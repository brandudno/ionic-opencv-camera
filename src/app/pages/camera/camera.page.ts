import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__, ViewChild, ElementRef } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { _ } from 'underscore';
import { Platform } from '@ionic/angular';

declare var window: any;
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

  @ViewChild("video", {static: false})
    public video: ElementRef;

  @ViewChild("canvas", {static: false})
  public canvas: ElementRef;

  constructor(
    private network: Network,
    private router: Router,
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

    if (this.platform.is('ios') && this.platform.is('cordova')) {

      cordova.plugins.iosrtc.getUserMedia(videoConstraints).then((stream) => {
          this.video.nativeElement.srcObject = stream;
          
          setInterval(() => {
            this.processImageAnalysis();
          }, 300);
          
        }
      );

    } else {
      const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      this.video.nativeElement.srcObject = stream;

      setInterval(() => {
        this.processImageAnalysis();
      }, 0);
    }
  }

  public capture() {
    this.canvas.nativeElement.width = this.video.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.video.nativeElement.offsetHeight;
    this.canvas.nativeElement.getContext('2d').drawImage(
      this.video.nativeElement,
      0, 0,
      this.canvas.nativeElement.offsetWidth, this.video.nativeElement.offsetHeight);  

    return this.canvas.nativeElement;
  }

  private processImageAnalysis() {
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    var src = cv.imread(this.canvas.nativeElement);
    let dst = new cv.Mat();

    cv.cvtColor(src, src, cv.COLOR_BGR2GRAY, 0);
    cv.bilateralFilter(src, dst, 7, 50, 50, cv.BORDER_DEFAULT);
    cv.Canny(src, dst, 8, 250, 3, false);

    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete();
  }
}
