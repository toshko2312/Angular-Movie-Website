import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountState, StoreState } from '../../shared/models';
import { MovieDetailsService } from '../movie-details.service';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectDetailedMovie } from '../store/movie-details.selectors';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css',
})
export class RatingsComponent implements OnInit, OnDestroy {
  title: string
  newRating: string;
  accountState: AccountState
  movieId: number
  onDestroyed$ = new Subject<void>()

  constructor(
    private movieDetailsService: MovieDetailsService,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.setStoreSub()
  }

  // Get star value on click
  onStarClick(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;

    if (target.name == 'star-radio') {
      if (target.checked) {
        this.newRating = target.value;
      }
    }
  }

  // Submit the new rating
  onSubmit() {
    this.movieDetailsService.submitRating(this.newRating, this.movieId);
    this.movieDetailsService.onToggleRating.set(false);
  }

  // Delete old rating if it exists
  onDelete() {
    if (
      this.accountState.rated ||
      this.movieDetailsService.rating().length > 4
    ) {
      this.movieDetailsService.deleteRating(this.movieId);
      this.movieDetailsService.onToggleRating.set(false);
    }
  }

  // Close rating pop-up
  onClose(e: Event) {
    const target = e.target as HTMLDivElement;

    if (target.id == 'background') {
      this.movieDetailsService.onToggleRating.set(false);
    }
  }

  setStoreSub() {
    this.store.select(selectDetailedMovie)
    .pipe(takeUntil(this.onDestroyed$))
    .subscribe((data) => {
      this.movieId = data.movie.id
      this.title = data.movie.title
      this.accountState = data.movie.account_states
    })
  }

  ngOnDestroy(): void {
    this.onDestroyed$.next()
  }
}
