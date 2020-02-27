import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public baseApiUrl = "https://0aa3knauyd.execute-api.eu-west-2.amazonaws.com/development/image";

  public postResults(imageData: String): Observable<any> {
    let requestBody = {
      "image": imageData
    };

    return this.httpClient.post(this.baseApiUrl, requestBody);
  }

}
