import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './landing-page/home/home.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {MaterialImportsModule} from './common/material-imports/material-imports.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './common/auth-interceptor.service';
import { HttpService } from './common/http.service';
import { ViewAllComponent } from './view-all/view-all.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SectionComponent } from './section/section.component';
import { TileComponent } from './tile/tile.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { WishListDialogComponent } from './wish-list-dialog/wish-list-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewAllComponent,
    SearchBarComponent,
    SectionComponent,
    TileComponent,
    ItemInfoComponent,
    WishListDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    HttpService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    WishListDialogComponent,
  ],
})
export class AppModule { }
