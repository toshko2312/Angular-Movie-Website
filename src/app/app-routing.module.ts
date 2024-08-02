import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'details',
    loadChildren: () =>
      import('./movie-details/movie-details.module').then((m) => m.MovieDetailsModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movie-listings/movie-listings.module').then((m) => m.MovieListingsModule),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: '**', redirectTo: 'movies' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}