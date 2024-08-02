import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { AppState, genresData, moviesData } from '../shared/models';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadMoreMovies, setGenres, setMovies } from './store/movie-listings.actions';
import { setLoading } from '../store/app.actions';

@Injectable({
  providedIn: 'root',
})
export class MovieListingsService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  // Subject for movie searching
  onMovieSearch = new Subject<{load_more: boolean, data: moviesData}>()
  // Keeping track of the last searched title for loading more movies
  searchTitle: string | null
  // Subject for reloading the movies 
  reloadMovies = new Subject<void>()

  // Fetch the available API genres
  fetchGenres = () => {
    return this.http.get<genresData>(environment.GENRES_URL, {
      headers: { Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN },
    }).subscribe({
      next: (data) => {
        this.store.dispatch(setGenres({genre: data}))
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  // Fetch Movies
  fetchMovies = (page: number, sort: string, category: string | null, load_more: boolean) => {
    // Resetting the title if we are not searching for a movie
    this.searchTitle = null

    let params = new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('language', 'en-US')
      .set('page', page)
      .set('sort_by', sort)
      .set('vote_count.gte', 800);

    if (category) {
      params = params.set('with_genres', category);
    }

    return this.http.get<moviesData>(environment.MOVIE_URL, {
      headers: { Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN },
      params: params,
    })      .subscribe({
      next: (data) => {
        if (load_more) {
          this.store.dispatch(loadMoreMovies({movie: data}))
        } else {
          this.store.dispatch(setMovies({ movie: data }));
          this.store.dispatch(setLoading({loading: false}))
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  // Search for a movie by title
  searchMovies = (title: string, load_more: boolean = false, page: number = 1) => {
    // Updating the searchTitle
    this.searchTitle = title

    // Transforming the title to q query suitable string in case it has spaces
    const queryTitle: string = new URLSearchParams({
      query: title,
    }).toString();

    this.http.get<moviesData>(`${environment.SEARCH_MOVIE_URL}?${queryTitle}&include_adult=false&language=en-US&page=${page}`, {
      headers: { Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN },
    }).subscribe((data) => {
      this.onMovieSearch.next({load_more: load_more, data: data})
    })

  }
}
