import { Component, signal, WritableSignal } from '@angular/core';
import { MovieListingsService } from '../movie-listings.service';
import { Store } from '@ngrx/store';
import { StoreState } from '../../shared/models';
import { setLoading } from '../../store/app.actions';

@Component({
  selector: 'app-movie-searching',
  templateUrl: './movie-searching.component.html',
  styleUrl: './movie-searching.component.css',
})
export class MovieSearchingComponent {
  constructor(
    private movieService: MovieListingsService,
    private store: Store<StoreState>
  ) {}

  typingTimer: ReturnType<typeof setTimeout>;
  doneTypingInterval: WritableSignal<number> = signal(1400);

  // Sets a timer after each keystroke, if another keystroke follows timer is cleared
  // if the timer runs out an HTTP request is being sent
  onSearch(e: Event) {
    const inputElement = e.target as HTMLInputElement;

    clearTimeout(this.typingTimer);
    if (inputElement.value) {
      this.typingTimer = setTimeout(() => {
        this.store.dispatch(setLoading({ loading: true }));
        this.movieService.searchMovies(inputElement.value);
      }, this.doneTypingInterval());
    } else if (this.movieService.searchTitle) {
      this.typingTimer = setTimeout(() => {
        this.movieService.reloadMovies.next();
      }, this.doneTypingInterval());
    }
  }
}
