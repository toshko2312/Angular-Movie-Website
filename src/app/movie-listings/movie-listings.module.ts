import { NgModule } from '@angular/core';
import { MovieListingsComponent } from './movie-listings.component';
import { CommonModule } from '@angular/common';
import { MovieListingsRoutingModule } from './movie-listings-routing.module';
import { MovieSearchingComponent } from './movie-searching/movie-searching.component';
import { MovieCardsComponent } from './movie-cards/movie-cards.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const components = [
  MovieListingsComponent,
  MovieSearchingComponent,
  MovieCardsComponent
];

@NgModule({
  declarations: components,
  exports: [],
  imports: [SharedModule, MovieListingsRoutingModule, FormsModule],
})
export class MovieListingsModule {}