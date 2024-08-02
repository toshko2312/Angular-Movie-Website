import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { detailedMovieData } from '../shared/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {

  // Toggle the rating pop-up
  onToggleRating: WritableSignal<boolean> = signal(false)
  // The text for the rate button
  rating: WritableSignal<string> = signal('Rate')

  constructor(private http: HttpClient) {}

  fetchDetailedMovie = (movieId: number) => {
    let params = new HttpParams()
    .set('session_id', sessionStorage.getItem('sessionId'))
    .set('append_to_response', 'videos,reviews,alternative_titles,recommendations,credits,account_states')

    // Fetching movie details
    return this.http.get<detailedMovieData>(
      environment.MOVIE_DETAILS_URL +
        `${movieId}`,
      {
        headers: {
          Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN,
        },
        params: params
      }
    );
  };

  submitRating(rating: string, movieId: number) {
    let params = new HttpParams()
    .set('session_id', sessionStorage.getItem('sessionId'))

    return this.http.post(
      `${environment.MOVIE_DETAILS_URL}${movieId}/rating`, {'value': rating},
      {
        headers: {
          Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN,
        },
        params: params,
      }
    ).subscribe({
      next: () => {
        this.rating.set(rating + ' Rate')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteRating(movieId: number) {
    let params = new HttpParams()
    .set('session_id', sessionStorage.getItem('sessionId'))

    return this.http.delete(
      `${environment.MOVIE_DETAILS_URL}${movieId}/rating`,
      {
        headers: {
          Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN,
        },
        params: params,
      }
    ).subscribe({
      next: () => {
        this.rating.set('Rate')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
