import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListingsComponent } from './movie-listings.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListingsComponent,
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class MovieListingsRoutingModule { }