import { Component, OnDestroy, OnInit, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { ProfileService } from './profile.service';
import { Genre, ProfileDetailsData, RatedMoviesData, StoreState } from '../shared/models';
import { MovieListingsService } from '../movie-listings/movie-listings.service';
import { Subject, map, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { setRatedMovies } from './store/profile.actions';
import { selectProfileDetails, selectRatedMovies } from './store/profile.selectors';
import { selectGenres } from '../movie-listings/store/movie-listings.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: WritableSignal<ProfileDetailsData> = signal(null);
  ratedMovies: WritableSignal<RatedMoviesData> = signal(null);
  page: Signal<number> = computed(() => this.profileService.setPage())
  genres: WritableSignal<Genre[]> = signal(null)
  onDestroyed$ = new Subject<void>()

  constructor(
    private profileService: ProfileService,
    private movieListingsService: MovieListingsService,
    private store: Store<StoreState>
  ) {
    // Getting rated movies on every page change
    effect(() => {
      this.getRatedMovies()
    })
  }

  ngOnInit(): void {
    this.setStoreSub()

    this.getProfileDetails();

    if(!this.genres) {
      this.getGenres()
    }
  }

  getProfileDetails() {
    this.profileService.fetchProfileDetails()
  }

  getRatedMovies() {
    this.profileService.fetchProfileRatings(this.page())
    .pipe(map((data) => {
      for (let index = 0; index < data.results.length; index++) {
        const movie = data.results[index];
        movie.genre_ids = movie.genre_ids.splice(0, 1)
        movie.genre_ids[0] = this.genres().find((obj) => obj.id === movie.genre_ids[0]).name
      }
      return data
    }))
    .subscribe({
      next: (data) => {
        this.store.dispatch(setRatedMovies({ratedMovies: data}))
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getGenres() {
    this.movieListingsService.fetchGenres()
  }

  setStoreSub() {
    this.store.select(selectGenres)
    .pipe(takeUntil(this.onDestroyed$))
    .subscribe((res) => {
      this.genres.set(res)
    })

    this.store.select(selectRatedMovies)
    .pipe(takeUntil(this.onDestroyed$))
    .subscribe((res) => {
      this.ratedMovies.set(res)
    })

    this.store.select(selectProfileDetails)
    .pipe(takeUntil(this.onDestroyed$))
    .subscribe((res) => {
      this.profile.set(res)
    })
  }

  ngOnDestroy(): void {
    this.onDestroyed$.next()
  }
}
