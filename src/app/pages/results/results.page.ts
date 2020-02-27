import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  
  constructor() {}
  
  ngOnInit() {

  }

}
