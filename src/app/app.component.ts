import { Component, OnInit } from '@angular/core';
import { HttpService } from './common/http.service';
import { MovieService } from './services/movie.service';
import { QueryModel } from './models/query.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private movieSrvc: MovieService) { }
  title = 'mean-project';
  ngOnInit(): void {
  }
}


