import { Injectable } from '@angular/core';
import { HttpService, ResponseModel } from '../common/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryModel } from '../models/query.model';
import { STATUSCODE, MESSAGE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpService, private _snackBar: MatSnackBar) { }

  searchTvShows(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      this.http.get('search/tv', mapApi).then((response: ResponseModel) => {
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

  getDetails(query: QueryModel, tvId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'tv/' + tvId;
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

  getLatest(query: QueryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map();
      Object.keys(query).forEach(key => {
        if (query[key]) {
          mapApi.set(key, query[key]);
        }
      });
      const url = 'tv/latest';
      this.http.get(url, mapApi).then((response: ResponseModel) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          if (!response.total_results) {
            this._snackBar.open(MESSAGE.NO_DATA , '', {
              duration: 2000
            });
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
      const url = 'tv/popular';
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
      const url = 'tv/top_rated';
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
