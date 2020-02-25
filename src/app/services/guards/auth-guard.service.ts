import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private storage: Storage,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Promise<Boolean> {
    return this.storage.get("authToken").then((authToken) => {
      if(authToken == null) {
        this.router.navigate(["login"]);
      }

      return authToken != null;
    });
  }
}
