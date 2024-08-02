import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Movie } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.css'
})
export class MovieCardsComponent implements OnChanges {
  @Input() movie: Movie
  imagePath: string

  ngOnChanges(): void {
    if (this.movie.poster_path) {
			this.imagePath = `${environment.IMAGE_URL}/${this.movie.poster_path}`;
		} else {
			this.imagePath = "../../../assets/default.svg.png";
		}
  }
}
