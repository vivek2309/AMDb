import { Injectable } from '@angular/core';
import { HttpService, ResponseModel } from '../common/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryModel } from '../models/query.model';
import { environment } from 'src/environments/environment';
import { STATUSCODE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class GeneresService {

  constructor(private http: HttpService, private _snackBar: MatSnackBar) {}

  getMovieList(): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map().set('language', environment.default_Language);
      this.http.get('genre/movie/list', mapApi).then((response: any) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          resolve(response);
        }
      });
    });
  }

  getTvList(): Promise<any> {
    return new Promise((resolve, reject) => {
      const mapApi = new Map().set('language', environment.default_Language);
      this.http.get('genre/tv/list', mapApi).then((response: any) => {
        if (response && response.status_code === STATUSCODE.NOT_FOUND) {
          resolve(false);
        } else {
          resolve(response);
        }
      });
    });
  }
}
