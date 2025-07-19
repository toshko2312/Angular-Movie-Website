import {
  Component,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Movie } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.css',
})
export class MovieCardsComponent implements OnInit {
  movie = input.required<Movie>();
  imagePath: WritableSignal<string> = signal('');

  ngOnInit(): void {
    if (this.movie().poster_path) {
      this.imagePath.set(
        `${environment.IMAGE_URL}/${this.movie().poster_path}`
      );
    } else {
      this.imagePath.set('../../../assets/default.svg.png');
    }
  }
}
