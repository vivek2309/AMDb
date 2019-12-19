import { Injectable } from '@angular/core';
import { HttpService, ResponseModel } from '../common/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryModel } from '../models/query.model';
import { STATUSCODE, MESSAGE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpService, private _snackBar: MatSnackBar) { }

  searchMovie(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      this.http.get('search/movie', mapApi).then((response: ResponseModel) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (response.total_results !== undefined && !response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else if (!response) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else {
            resolve(response);
          }
        }
      });
    });
  }

  getMovieInfo(query: QueryModel, movieId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'movie/' + movieId;
      this.http.get(url, mapApi).then((response: any) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (response.total_results !== undefined && !response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else if (!response) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else {
            resolve(response);
          }
        }
      });
    });
  }

  getLatest(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'movie/latest';
      this.http.get(url, mapApi).then((response: ResponseModel) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (response.total_results !== undefined && !response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else if (!response) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else {
            resolve(response);
          }
        }
      });
    });
  }

  getNowPlaying(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'movie/now_playing';
      this.http.get(url, mapApi).then((response: ResponseModel) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (response.total_results !== undefined && !response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else if (!response) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else {
            resolve(response);
          }
        }
      });
    });
  }

  getPopular(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'movie/popular';
      this.http.get(url, mapApi).then((response: ResponseModel) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (response.total_results !== undefined && !response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else if (!response) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else {
            resolve(response);
          }
        }
      });
    });
  }

  getTopRated(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'movie/top_rated';
      this.http.get(url, mapApi).then((response: ResponseModel) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (response.total_results !== undefined && !response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else if (!response) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else {
            resolve(response);
          }
        }
      });
    });
  }

  getUpcoming(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'movie/upcoming';
      this.http.get(url, mapApi).then((response: ResponseModel) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (response.total_results !== undefined && !response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else if (!response) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
            resolve(false);
          } else {
            resolve(response);
          }
        }
      });
    });
  }
}
