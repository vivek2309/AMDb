import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from '../models/base.model';
import { INDEX_KEYS, TYPES } from '../constants/constants';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { WishListDialogComponent } from '../wish-list-dialog/wish-list-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('tile-info') tileInfo: any;
  type: string;
  readonly CELEB = TYPES.CELEB;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private trackSrvc: TrackService) { }

  ngOnInit() {
    this.type = localStorage.getItem(INDEX_KEYS.SEARCH_TYPE);
  }

  getRouterLink(id) {
    if (this.type === TYPES.MOVIE) {
      return 'movie/' + id;
    } else if (this.type === TYPES.TV) {
      return 'tv/' + id;
    } else if (this.type === TYPES.CELEB) {
      return 'celebrity/' + id;
    }
  }

  redirectTo(id) {
    const url = this.getRouterLink(id);
    this.router.navigate([url]);
    this.trackSrvc.trackBS.next(true);
  }

}
