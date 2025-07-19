import { Component, input, Input } from '@angular/core';
import { MovieRating } from '../../shared/models';

@Component({
  selector: 'app-rating-cards',
  templateUrl: './rating-cards.component.html',
  styleUrl: './rating-cards.component.css',
})
export class RatingCardsComponent {
  movie = input.required<MovieRating>();
}
