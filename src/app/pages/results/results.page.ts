import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  public imageResults: any;
  public todaysDateAndTime: String;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}
  
  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getResults();
    this.generateDate();
  }

  public getResults(): void {
    this.storageService.getStoredResults().subscribe((results) => {
      console.log(results);
      this.imageResults = results;
    });
  }

  public generateDate(): void {
    let currentDate: Date = new Date();

    this.todaysDateAndTime = formatDate(currentDate, "dd/MM/yyyy HH:MM", "en-GB")
  }

  public clearResultsAndNavigateToCamera(): void {
    this.storageService.clearStoredResults().subscribe(() => {
      this.router.navigate(['/camera']);
    })
  }

}
