import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import * as moment from 'moment';

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

      let userBeenLoggedInOver12Hours = this.hasUserBeenLoggedInOver12Hours(authToken.dateLoggedIn);

      if(userBeenLoggedInOver12Hours) {
        this.storageService.signOut().subscribe(() => {
          this.router.navigate(["login"]);
        });

        return false;
      }

      return authToken != null;
    });
  }

  public hasUserBeenLoggedInOver12Hours(dateLoggedIn: Date): Boolean {
    let timeSinceLogin = moment.duration({ from: dateLoggedIn, to: moment() });
    let userBeenLoggedInOver12Hours = timeSinceLogin.asHours() >= 12;

    return userBeenLoggedInOver12Hours;
  }
}
