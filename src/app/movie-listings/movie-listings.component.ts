import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MovieListingsService } from './movie-listings.service';
import { StoreState, moviesData } from '../shared/models';
import { Subject, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectPage } from '../store/app.selectors';
import * as storeActions from '../store/app.actions';
import { loadMoreMovies, setMovies } from './store/movie-listings.actions';
import { selectGenres, selectMovies } from './store/movie-listings.selectors';

@Component({
  selector: 'app-movie-listings',
  templateUrl: './movie-listings.component.html',
  styleUrl: './movie-listings.component.css',
})
export class MovieListingsComponent implements OnInit, OnDestroy {
  constructor(
    private movieListingsService: MovieListingsService,
    private titleService: Title,
    private store: Store<StoreState>
  ) {}

  ngDestroyed$ = new Subject<void>();
  genres$ = this.store.select(selectGenres);
  movies: WritableSignal<moviesData | null> = signal(null);
  page: WritableSignal<number> = signal(0);
  category: WritableSignal<string | null> = signal(null);
  sort_by: WritableSignal<string> = signal('default');
  loading = this.store.select(selectIsLoading);

  ngOnInit(): void {
    // Set store subs
    this.setMovieSub();
    this.setPageSub();

    // Fetching the initial movies and genres, and setting up the required subs
    this.setGenres();
    this.setMovies();
    this.setSearchSubscription();
    this.setReloadMoviesSubscription();

    // Setting the title
    this.titleService.setTitle('Movies');
  }

  // Fetch the new movies when either the category or sort by is changed
  onFilterChange() {
    this.store.dispatch(storeActions.setPage({ page: 1 }));
    this.setMovies();
  }

  // Load the next page
  onLoadMore() {
    // Checking if the next page should be for search or discover endpoint
    if (this.movieListingsService.searchTitle) {
      if (this.page() < this.movies().total_pages) {
        this.store.dispatch(storeActions.incrementPage());
        this.movieListingsService.searchMovies(
          this.movieListingsService.searchTitle(),
          true,
          this.page()
        );
      }
    } else {
      if (this.page() < this.movies().total_pages) {
        this.store.dispatch(storeActions.incrementPage());
        this.setMovies(true);
      }
    }
  }

  // Setting the new movies
  setMovies = (load_more: boolean = false) => {
    if (!load_more) {
      this.store.dispatch(storeActions.setLoading({ loading: true }));
    }
    this.movieListingsService.fetchMovies(
      this.page(),
      this.sort_by(),
      this.category() === 'default' ? 'popularity.desc' : this.category(),
      load_more
    );
  };

  // Setting the genres
  setGenres() {
    this.movieListingsService.fetchGenres();
  }

  // Setting up the search movie endpoint sub
  setSearchSubscription() {
    this.movieListingsService.onMovieSearch
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe({
        next: (data) => {
          if (data.load_more) {
            this.store.dispatch(loadMoreMovies({ movie: data.data }));
            this.store.dispatch(storeActions.incrementPage());
          } else {
            this.store.dispatch(storeActions.setLoading({ loading: false }));
            this.store.dispatch(setMovies({ movie: data.data }));
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Reload movies
  setReloadMoviesSubscription() {
    this.movieListingsService.reloadMovies
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(() => {
        this.setMovies();
      });
  }

  setMovieSub() {
    this.store
      .select(selectMovies)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((res) => {
        this.movies.set(res);
      });
  }

  setPageSub() {
    this.store
      .select(selectPage)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((res) => {
        this.page.set(res);
      });
  }

  // Unsubscribing from the subs
  ngOnDestroy(): void {
    this.ngDestroyed$.next();
  }
}
