import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  public track: boolean;
  public trackBS: BehaviorSubject<boolean>;
  public trackObs: Observable<boolean>;
  constructor() {
    this.track = false;
    this.trackBS = new BehaviorSubject<boolean>(this.track);
    this.trackObs = this.trackBS.asObservable();
  }
}
