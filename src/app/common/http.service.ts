import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

export class ResponseModel {
  page: number;
  total_results: number;
  total_pages: number;
  results: Array<any>;
  status_message: string;
  status_code: number;
  constructor(data: {
      page?: number;
      total_results?: number;
      total_pages?: number;
      results?: Array<any>;
      status_message?: string
      status_code?: number;
  } = {}) {
      this.results = data.results || [];
      this.page = data.page ;
      this.total_results = data.total_results;
      this.total_pages = data.total_pages;
      this.status_message = data.status_message;
      this.status_code = data.status_code;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(url: string, requestParams: Map<string, any>, body: any): Promise<any> {
    const URL = this.buildUrl(url);
    if (!requestParams) {
      requestParams = new Map();
    }
    let params =  new HttpParams().append('api_key', environment.apiKey);
    requestParams.forEach((value, key) => {
      params = params.append(key, value);
    });

    return new Promise<ResponseModel>((resolve, reject) => {
      this.http.post(URL, body, {params}).subscribe((data: ResponseModel) => {
        // tslint:disable-next-line:variable-name
        // localStorage.setItem('token', data.token);
        // const res = new ResponseModel(data.data, data.msgList, data.error, data.status, data.otherInfo);
        resolve(data);
      });
    });
  }

  put(url: string, requestParams: Map<string, any>, body: any): Promise<any> {
    const URL = this.buildUrl(url);
    if (!requestParams) {
      requestParams = new Map();
    }
    let params = new HttpParams().append('api_key', environment.apiKey);
    requestParams.forEach((value, key) => {
      params = params.append(key, value);
    });

    return new Promise<any>((resolve, reject) => {
      this.http.put(URL, body, {params}).subscribe(data => {
        // localStorage.setItem('token', data.token);
        // const res = new ResponseModel(data.data, data.msgList, data.error, data.status, data.otherInfo);
        resolve(data);
      });
    });
  }

  get(url: string, requestParams: Map<string, any>): Promise<any> {
    const URL = this.buildUrl(url);
    if (!requestParams) {
      requestParams = new Map();
    }
    let params = new HttpParams().append('api_key', environment.apiKey);
    requestParams.forEach((value, key) => {
      params = params.append(key, value);
    });

    return new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.http.get(URL, {params}).subscribe((data: ResponseModel) => {
        // const res = new ResponseModel(data.data, data.msgList, data.error, data.status, data.otherInfo);
        resolve(data);
      });
    });
  }

  delete(url: string, requestParams: Map<string, any>, body: any): Promise<any> {
    const URL = this.buildUrl(url);
    if (!requestParams) {
      requestParams = new Map();
    }
    let params = new HttpParams().append('api_key', environment.apiKey);
    requestParams.forEach((value, key) => {
      params = params.append(key, value);
    });

    return new Promise<any>((resolve, reject) => {
      this.http.delete(URL, {params}).subscribe(data => {
        // localStorage.setItem('token', data.token);
        // const res = new ResponseModel(data.data, data.msgList, data.error, data.status, data.otherInfo);
        resolve(data);
      });
    });
  }
  buildUrl(URL: string) {
    return environment.server + '/' + URL;
  }
}
