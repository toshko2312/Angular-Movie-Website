import { Component, Input } from '@angular/core';
import { MovieRating } from '../../shared/models';

@Component({
  selector: 'app-rating-cards',
  templateUrl: './rating-cards.component.html',
  styleUrl: './rating-cards.component.css'
})
export class RatingCardsComponent {
  
  @Input() movie: MovieRating
}
