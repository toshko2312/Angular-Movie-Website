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
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrl: './similar-movies.component.css',
})
export class SimilarMoviesComponent implements OnInit {
  movie = input.required<Movie>();
  imagePath: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.setImagePath();
  }

  setImagePath() {
    if (this.movie().poster_path) {
      this.imagePath.set(
        `${environment.IMAGE_URL}/${this.movie().poster_path}`
      );
    } else {
      this.imagePath.set('../../../assets/default.svg.png');
    }
  }
}
