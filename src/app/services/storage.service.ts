import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {}

  public storageReady(): Observable<LocalForage> {
    return from(this.storage.ready());
  }

  public getAuthToken(): Observable<String> {
    return from(this.storage.get('authToken'));
  }

  public setAuthToken(authToken: String): Observable<string> {
    return from(this.storage.set('authToken', "AUTH_TOKEN"));
  }

  public clearStorage(): Observable<any> {
    return from(this.storage.clear());
  }

  public signOut(): Observable<any> {
    return from(this.storage.set('authToken', null));
  }

}
