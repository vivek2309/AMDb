import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { TvService } from '../services/tv.service';
import { QueryModel } from '../models/query.model';
import { ResponseModel } from '../common/http.service';
import { MovieModel } from '../models/movie.model';
import { GeneresService } from '../services/generes.service';
import { GeneresModel } from '../models/generes.model';
import { INDEX_KEYS, TYPES } from '../constants/constants';
import { TvShowModel } from '../models/tv-show.model';
import { PersonService } from '../services/person.service';
import { PeopleModel } from '../models/people.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit, OnDestroy {
  paginatorLength = 0;
  itemId: number;
  urlPath: string;
  itemInfo: any;
  wishList: Array<string> = [];
  genreList: Array<GeneresModel> = [];
  searchList: any[];
  subArray: Array<Subscription> = [];
  // tslint:disable-next-line:no-inferrable-types
  isSearchData: boolean = false;
  readonly CELEB = TYPES.CELEB;
  view: any = {
    search_title: 'Search Result...'
  };
  searchType: string;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private movieSrvc: MovieService, private tvSrvc: TvService, private genreSrvc: GeneresService, private router: Router, private celebSrvc: PersonService) { }

  ngOnInit() {
    this.searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    this.wishList = JSON.parse(localStorage.getItem(INDEX_KEYS.WISHLIST));
    if (!this.wishList) {
      this.wishList = [];
    }
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.urlPath = this.activatedRoute.snapshot.routeConfig.path;
    this.subArray.push(
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.itemId = this.activatedRoute.snapshot.params.id;
          this.urlPath = this.activatedRoute.snapshot.routeConfig.path;
          this.isSearchData = false;
          this.execute();
        }
      })
    );
    this.execute();
  }

  execute() {
    if (this.urlPath.includes('movie')) {
      // this.genreSrvc.getMovieList().then(data => {
      //   this.genreList = [];
      //   if (data && data.genres) {
      //     this.genreList = (data.genres as Array<GeneresModel>).map(x => new GeneresModel(x));
      //   }
      // });
      this.movieSrvc.getMovieInfo(new QueryModel(), this.itemId).then(data => {
        this.itemInfo = [];
        if (data) {
          this.itemInfo = new MovieModel(data);
        }
      });
    } else if (this.urlPath.includes('tv')) {
      this.tvSrvc.getDetails(new QueryModel(), this.itemId).then(data => {
        this.itemInfo = new TvShowModel(data);
      });
    } else if (this.urlPath.includes('celeb')) {
      this.celebSrvc.getDetails(new QueryModel(), this.itemId).then(data => {
        this.itemInfo = new PeopleModel(data);
      });
    }
  }

  getGenre(id) {
    return this.genreList.find(x => x.id === id).name;
  }

  searchHandler(data) {
    this.searchList = [];
    this.isSearchData = true;
    const searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    if (data) {
      const _ = (data as ResponseModel);
      this.paginatorLength = _.total_results;
      this.searchList = [];
      if (_.results && searchType === TYPES.MOVIE) {
        this.searchList = _.results ? _.results.map(x => new MovieModel(x)) : [];
      } else if (_.results && searchType === TYPES.TV) {
        this.searchList = _.results ? _.results.map(x => new TvShowModel(x)) : [];
      } else if (_.results && searchType === TYPES.CELEB) {
        // this.searchList = _.results ? _.results.map(x => new (x)) : [];
      }
    }
  }

  pageChangeHandler(event) {
    const query = new QueryModel({
      page: event.pageIndex + 1,
      query: localStorage.getItem(INDEX_KEYS.SEARCH_STRING)
    });
    const searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    if (searchType === TYPES.MOVIE) {
      this.movieSrvc.searchMovie(query).then(data => {
        this.searchHandler(data);
      });
    } else if (searchType === TYPES.TV) {
      this.tvSrvc.searchTvShows(query).then(data => {
        this.searchHandler(data);
      });
    } else if (searchType === TYPES.CELEB) {
      // this.getTopRated(query);
    }
  }
  addDeleteWishList(id) {
    const searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    const p = searchType + '#' + id;
    let wishList: Array<string> = JSON.parse(localStorage.getItem(INDEX_KEYS.WISHLIST));
    if (!wishList) {
      wishList = [];
    }
    // tslint:disable-next-line:triple-equals
    const index = wishList.findIndex(x => x == p );
    if (index === -1) {
      wishList.push(p);
    } else  {
      wishList.splice(index, 1);
    }
    localStorage.setItem(INDEX_KEYS.WISHLIST, JSON.stringify(wishList));
    this.wishList = wishList;
  }

  isPresentInWishlist(id) {
    const searchType = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
    const p = searchType + '#' + id;
    return this.wishList.findIndex(x => x === p);
  }
  ngOnDestroy(): void {
    this.subArray.forEach(item => {
      item.unsubscribe();
    });
  }
}
