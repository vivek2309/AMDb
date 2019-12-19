import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { QueryModel } from '../models/query.model';
import { TvService } from '../services/tv.service';
import { PersonService } from '../services/person.service';
import { INDEX_KEYS, TYPES } from '../constants/constants';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchResult = new EventEmitter<any>();
  regEx = '/^[a-z0-9]+$/i';
  searchTypes: Array<any> = [
    {
      label: 'Movies',
      value: '1'
    },
    {
      label: 'Tv Shows',
      value: '2'
    },
    {
      label: 'Celebrity',
      value: '3'
    }
  ];
  form: FormGroup;
  view = {
    search_placeholder: 'Find Movies, Tv Shows and Celebrities'
  };
  constructor(private fb: FormBuilder, private movieSrvc: MovieService, private tvSrvc: TvService, private celebSrvc: PersonService) { }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['', [Validators.required]],
      searchType: [this.searchTypes[0].value]
    });
  }

  searchHandler() {
    localStorage.setItem(INDEX_KEYS.SEARCH_STRING, this.form.value.query);
    // tslint:disable-next-line:triple-equals
    if (this.form.value.searchType == this.searchTypes[0].value) {
      localStorage.setItem(INDEX_KEYS.SEARCH_TYPE, TYPES.MOVIE);
      this.movieSrvc.searchMovie(new QueryModel(this.form.value)).then(res => {
        this.searchResult.emit(res);
      });
      // tslint:disable-next-line:triple-equals
    } else if (this.form.value.searchType == this.searchTypes[1].value) {
      localStorage.setItem(INDEX_KEYS.SEARCH_TYPE, TYPES.TV);
      this.tvSrvc.searchTvShows(new QueryModel(this.form.value)).then(res => {
        this.searchResult.emit(res);
      });
      // tslint:disable-next-line:triple-equals
    } else if (this.form.value.searchType == this.searchTypes[2].value) {
      localStorage.setItem(INDEX_KEYS.SEARCH_TYPE, TYPES.CELEB);
      this.celebSrvc.searchPeople(new QueryModel(this.form.value)).then(res => {
        this.searchResult.emit(res);
      });
    }
  }

}
