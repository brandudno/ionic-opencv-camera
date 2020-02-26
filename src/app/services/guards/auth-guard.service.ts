import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private storage: Storage,
    private storageService: StorageService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Promise<Boolean> {
    return this.storage.get("authToken").then((authToken) => {
      if(authToken == null) {
        this.router.navigate(["login"]);
      }

      this.checkTimeSignedInFor(authToken.dateLoggedIn);

      return authToken != null;
    });
  }

  public checkTimeSignedInFor(dateLoggedIn: Date): void {
    let loggedInDate = new Date(dateLoggedIn);
    let eventEndTime = new Date();
    let differenceInMilliseconds = eventEndTime.valueOf() - loggedInDate.valueOf();
    let differenceInHours = this.convertMSToHours(differenceInMilliseconds);

    if(differenceInHours >= 12) {
      this.storageService.signOut().subscribe(() => {
        this.router.navigate(["login"]);
      });
    }
  }

  public convertMSToHours(milliseconds: number): number {
    let hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    hour = hour % 24;
    return hour;
  }
}
