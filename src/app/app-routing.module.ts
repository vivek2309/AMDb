import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './landing-page/home/home.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ItemInfoComponent } from './item-info/item-info.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'movie/:id', component: ItemInfoComponent
  },
  {
    path: 'tv/:id', component: ItemInfoComponent
  },
  {
    path: 'celebrity/:id', component: ItemInfoComponent
  },
  {
    path: 'movie', component: ViewAllComponent
  },
  {
    path: 'tv', component: ViewAllComponent
  },
  {
    path: 'celebrity', component: ViewAllComponent
  },
  {
    path: '', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
