import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  public imageResults;

  constructor(
    private storageService: StorageService
  ) {}
  
  ngOnInit() {
    this.getResults();
  }

  public getResults(): void {
    this.storageService.getStoredResults().subscribe((results) => {
      this.imageResults = results;
    });
  }

}
