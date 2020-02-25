import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MockApiService {

  constructor() {}

  public access(username: String, password: String): Observable<any> {
    if(username !== 'tom.myers@platformkinetics.com' && password !== 'Password123!') {
      return throwError(new Error("Sorry, you have entered a wrong username and password combination"));
    }

    return of({ success: false, message: 'Successfully authenticated' });
  }


}
