import { Injectable } from '@angular/core';
import { MockApiService } from './mock-api.service';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private mockApiService: MockApiService) { }

  public authenticate(username: String, password: String): Observable<any> {
    return this.mockApiService.access(username, password);
  }
}
