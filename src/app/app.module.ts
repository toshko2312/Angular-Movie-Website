import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { profileReducer } from './profile/store/profile.reducer';
import { movieListingsReducer } from './movie-listings/store/movie-listings.reducer';
import { movieDetailsReducer } from './movie-details/store/movie-details.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      app: appReducer,
      profile: profileReducer,
      movieListings: movieListingsReducer,
      movieDetails: movieDetailsReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
