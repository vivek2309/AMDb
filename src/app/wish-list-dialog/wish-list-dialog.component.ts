import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { TvService } from '../services/tv.service';
import { GeneresService } from '../services/generes.service';
import { INDEX_KEYS, TYPES } from '../constants/constants';
import { QueryModel } from '../models/query.model';
import { MovieModel } from '../models/movie.model';
import { TvShowModel } from '../models/tv-show.model';
import { MatDialogRef } from '@angular/material/dialog';
import { TrackService } from '../services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list-dialog',
  templateUrl: './wish-list-dialog.component.html',
  styleUrls: ['./wish-list-dialog.component.scss']
})
export class WishListDialogComponent implements OnInit, OnDestroy {
  readonly CELEB = TYPES.CELEB;
  readonly MOVIE = TYPES.MOVIE;
  readonly TV = TYPES.TV;
  itemList: Array<any> = [];
  sub: Subscription;
  // tslint:disable-next-line:max-line-length
  constructor( private movieSrvc: MovieService, private tvSrvc: TvService, private genreSrvc: GeneresService, public dialogRef: MatDialogRef<WishListDialogComponent>, private trackSrvc: TrackService) { }

  ngOnInit() {
    const wishList: Array<string> = JSON.parse(localStorage.getItem(INDEX_KEYS.WISHLIST));
    this.itemList = [];
    wishList.forEach(item => {
      const arr = item.split('#');
      if (arr[0]  === this.MOVIE) {
        this.getMovie(arr[1]);
      } else if (arr[0]  === this.TV) {
        this.getTvShow(arr[1]);
      }
    });

    this.sub =  this.trackSrvc.trackObs.subscribe(data => {
      if (data) {
        this.onClose();
      }
    });
  }

  getMovie(id) {
    this.movieSrvc.getMovieInfo(new QueryModel(), id).then(data => {
      if (data) {
        this.itemList.push(new MovieModel(data));
      }
    });
  }

  getTvShow(id) {
    this.tvSrvc.getDetails(new QueryModel(), id).then(data => {
      this.itemList.push(new TvShowModel(data));
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
