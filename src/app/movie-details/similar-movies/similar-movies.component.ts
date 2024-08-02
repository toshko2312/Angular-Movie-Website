import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Movie } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrl: './similar-movies.component.css'
})
export class SimilarMoviesComponent implements OnChanges {
  @Input() movie: Movie
  imagePath: string

  ngOnChanges(): void {
    this.setImagePath()
  }

  setImagePath() {
    if (this.movie.poster_path) {
			this.imagePath = `${environment.IMAGE_URL}/${this.movie.poster_path}`;
		} else {
			this.imagePath = "../../../assets/default.svg.png";
		}
  }
}
