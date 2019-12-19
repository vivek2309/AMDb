import { Component, OnInit, Input } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { TrackService } from '../services/track.service';
import { INDEX_KEYS, TYPES } from '../constants/constants';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('title') title: string;
  // tslint:disable-next-line:no-input-rename
  @Input('type') type: string;
  // tslint:disable-next-line:no-input-rename
  @Input('movie-list') itemList: Array<any>;
  readonly SEARCH = TYPES.SEARCH;
  // tslint:disable-next-line:no-inferrable-types
  hideLink: boolean = false;
  searchType: string;
  constructor(private trackSrvc: TrackService) { }

  ngOnInit() {
    this.searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    if (this.type === this.SEARCH) {
      this.hideLink = true;
    } else {
      this.hideLink = false;
    }
  }

  moreHandler() {
    // this.trackSrvc.trackBS.next(this.type);
    localStorage.setItem(INDEX_KEYS.TYPE, this.type + '');
  }

  getRouterLink() {
    if (this.searchType === TYPES.CELEB) {
      return '/celebrity';
    } else if (this.searchType === TYPES.MOVIE) {
      return '/movie';
    } if (this.searchType === TYPES.TV) {
      return '/tv';
    }
  }
}
