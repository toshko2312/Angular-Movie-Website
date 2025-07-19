import {
  Component,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieDetailsService } from './movie-details.service';
import { AppState, detailedMovieData } from '../shared/models';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../store/app.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { setLoading } from '../store/app.actions';
import {
  selectDetailedMovie,
  selectShake,
} from './store/movie-details.selectors';
import { setDetailedMovie, setShake } from './store/movie-details.actions';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  detailedMovieData: WritableSignal<detailedMovieData | null> = signal(null);
  trailerUrl: WritableSignal<string> = signal('');
  loading: Observable<boolean> = this.store.select(selectIsLoading);
  alternativeTitles: WritableSignal<string> = signal('');
  genres: WritableSignal<string> = signal('');
  showRating: Signal<boolean> = computed(() =>
    this.movieDetailsService.onToggleRating()
  );
  shake = this.store.select(selectShake);
  rating: Signal<string> = computed(() => this.movieDetailsService.rating());
  ngDestroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    private titleService: Title,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getMovie();
    this.setDetailedMovieSub();
  }

  getMovie() {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.store.dispatch(setLoading({ loading: true }));
        this.movieDetailsService.fetchDetailedMovie(+params['id']).subscribe({
          next: (data) => {
            this.store.dispatch(setDetailedMovie({ movie: data }));
            this.setAlternativeTitles();
            this.setGenres();
            if (data.account_states) {
              this.movieDetailsService.rating.set(
                data.account_states.rated
                  ? data.account_states.rated.value + ' Rate'
                  : 'Rate'
              );
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

  setAlternativeTitles() {
    this.alternativeTitles.set(
      this.detailedMovieData()
        .alternative_titles.titles.map((title) => title.title)
        .splice(0, 7)
        .join(', ')
    );
  }

  setGenres() {
    this.genres.set(
      this.detailedMovieData().genres.map((genre) => genre.name).join(', ')
    );
  }

  // Show rating pop-up if logged in, otherwise execute the shake animation
  onRate(e: Event) {
    if (this.detailedMovieData().account_states) {
      this.movieDetailsService.onToggleRating.set(true);
    } else {
      this.store.dispatch(setShake({ shake: true }));
      setTimeout(() => {
        this.store.dispatch(setShake({ shake: false }));
      }, 700);
    }
  }

  setDetailedMovieSub() {
    this.store
      .select(selectDetailedMovie)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((data) => {
        if (data.movie) {
          this.detailedMovieData.set(data.movie)
          this.trailerUrl.set(data.trailerUrl)
          this.titleService.setTitle(data.movie.title);
          this.store.dispatch(setLoading({ loading: false }));
        }
      });
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.store.dispatch(setDetailedMovie({ movie: null }));
  }
}
