import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { QueryModel } from 'src/app/models/query.model';
import { MovieModel } from 'src/app/models/movie.model';
import { ResponseModel } from 'src/app/common/http.service';
import {TYPES, INDEX_KEYS} from '../../constants/constants';
import { TvShowModel } from 'src/app/models/tv-show.model';
import { MatDialog } from '@angular/material/dialog';
import { WishListDialogComponent } from 'src/app/wish-list-dialog/wish-list-dialog.component';
import { PeopleModel } from 'src/app/models/people.model';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  view: any = {
    header_text: 'The world\'s most popular and authoritative source for movies, tv and Celebrity content',
    recent_title: 'Recently Released',
    top_rated_title: 'Top Rated Movies',
    search_title: 'Search Result...'
  };
  isSearchData = false;
  readonly MAX_MOVIES = 10;
  readonly RECENT_RELEASE = TYPES.RECENT_RELEASE;
  readonly TOP_RATED = TYPES.TOP_RATED;
  readonly SEARCH = TYPES.SEARCH;
  recentReleasedMovies: Array<MovieModel> = [];
  topRatedMovies: Array<MovieModel> = [];
  searchList: Array<any> = [];

  constructor(private movieSrvc: MovieService, public dialog: MatDialog, private trackSrvc: TrackService) { }

  ngOnInit() {
    localStorage.setItem(INDEX_KEYS.SEARCH_TYPE, TYPES.MOVIE);
    this.movieSrvc.getTopRated(new QueryModel()).then(data => {
      if (data) {
        const _  = (data as ResponseModel);
        this.topRatedMovies = [];
        if (_.results) {
          for ( let i = 0; i < this.MAX_MOVIES; ++i) {
            this.topRatedMovies.push(new MovieModel(_.results[i]));
          }
        }
      }
    });

    this.movieSrvc.getNowPlaying(new QueryModel()).then(data => {
      if (data) {
        const _  = (data as ResponseModel);
        this.recentReleasedMovies = [];
        if (_.results) {
          for ( let i = 0; i < this.MAX_MOVIES; ++i) {
            this.recentReleasedMovies.push(new MovieModel(_.results[i]));
          }
        }
      }
    });
  }

  searchHandler(data) {
    this.searchList = [];
    this.isSearchData = true;
    const searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    if (data) {
      const _  = (data as ResponseModel);
      this.searchList = [];
        if (_.results && searchType === TYPES.MOVIE) {
          this.searchList = _.results ? _.results.map(x => new MovieModel(x)) : [];
        } else if (_.results && searchType === TYPES.TV) {
          this.searchList = _.results ? _.results.map(x => new TvShowModel(x)) : [];
        } else if (_.results && searchType === TYPES.CELEB) {
          localStorage.setItem(INDEX_KEYS.SEARCH_TYPE, TYPES.CELEB);
          this.searchList = _.results ? _.results.map(x => new PeopleModel(x)) : [];
        }
    }
  }

  openDialog(): void {
    this.trackSrvc.trackBS.next(false);
    const dialogRef = this.dialog.open(WishListDialogComponent, {
      width: '90%',
      height: '90%' ,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
