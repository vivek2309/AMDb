import { Component, OnInit } from '@angular/core';
import { TrackService } from '../services/track.service';
import { TYPES, INDEX_KEYS } from '../constants/constants';
import { MovieService } from '../services/movie.service';
import { QueryModel } from '../models/query.model';
import { ResponseModel } from '../common/http.service';
import { MovieModel } from '../models/movie.model';
import { PersonService } from '../services/person.service';
import { PeopleModel } from '../models/people.model';
import { TvService } from '../services/tv.service';
import { TvShowModel } from '../models/tv-show.model';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  list = [];
  type: string;
  paginatorLength = 0;
  searchText: string;
  searchType: string;
  // tslint:disable-next-line:max-line-length
  constructor(private trackSrvc: TrackService, private movieSrvc: MovieService, private celebSrvc: PersonService, private tvSrvc: TvService) { }

  ngOnInit() {
    this.type = localStorage.getItem(INDEX_KEYS.TYPE);
    this.searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    this.searchText = localStorage.getItem(INDEX_KEYS.SEARCH_STRING);
    if (this.type === TYPES.RECENT_RELEASE) {
      this.getNowPlaying();
    } else if (this.type === TYPES.TOP_RATED) {
      this.getTopRated();
    } else if (this.searchType === TYPES.CELEB) {
      this.getCelebrity();
    } else if (this.searchType === TYPES.TV) {
      this.getTvShow();
    }
  }
  getTvShow(query?: QueryModel) {
    if (!query) {
      query = new QueryModel();
    }
    query.query = this.searchText;
    this.list = [];
    this.tvSrvc.searchTvShows(query).then(data => {
      const _ = (data as ResponseModel);
      this.paginatorLength = _.total_results;
      this.list = _.results ? _.results.map(x => new TvShowModel(x)) : [];
    });
  }
  getCelebrity(query?: QueryModel) {
    this.list = [];
    if (!query) {
      query = new QueryModel();
    }
    query.query = this.searchText;
    this.celebSrvc.searchPeople(query).then(data => {
      const _ = (data as ResponseModel);
      this.paginatorLength = _.total_results;
      this.list = _.results ? _.results.map(x => new PeopleModel(x)) : [];
    });
  }

  getNowPlaying(query?: QueryModel) {
    if (!query) {
      query = new QueryModel();
    }
    this.movieSrvc.getNowPlaying(query).then(data => {
      this.list = [];
      if (data) {
        const _ = (data as ResponseModel);
        this.paginatorLength = _.total_results;
        this.list = _.results ? _.results.map(x => new MovieModel(x)) : [];
      }
    });
  }

  getTopRated(query?: QueryModel) {
    if (!query) {
      query = new QueryModel();
    }
    this.movieSrvc.getTopRated(query).then(data => {
      this.list = [];
      if (data) {
        const _ = (data as ResponseModel);
        this.paginatorLength = _.total_results;
        this.list = _.results ? _.results.map(x => new MovieModel(x)) : [];
      }
    });
  }

  pageChangeHandler(event) {
    const query = new QueryModel({
      page: event.pageIndex + 1
    });
    if (this.type === TYPES.RECENT_RELEASE) {
      this.getNowPlaying(query);
    } else if (this.type === TYPES.TOP_RATED) {
      this.getTopRated(query);
    } else if (this.searchType === TYPES.CELEB) {
      this.getCelebrity(query);
    } else if (this.searchType === TYPES.TV) {
      this.getTvShow(query);
    }
  }
}
