import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieListingsRoutingModule } from './movie-details-routing,module,';
import { MovieDetailsComponent } from './movie-details.component';
import { SimilarMoviesComponent } from './similar-movies/similar-movies.component';
import { CastComponent } from './cast/cast.component';
import { CrewComponent } from './crew/crew.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SharedModule } from '../shared/shared.module';
import { RatingsComponent } from './ratings/ratings.component';

const components = [
  MovieDetailsComponent,
  SimilarMoviesComponent,
  CastComponent,
  CrewComponent,
  ReviewsComponent,
  RatingsComponent
];

@NgModule({
  declarations: components,
  exports: [],
  imports: [SharedModule, FormsModule, MovieListingsRoutingModule],
})
export class MovieDetailsModule {}