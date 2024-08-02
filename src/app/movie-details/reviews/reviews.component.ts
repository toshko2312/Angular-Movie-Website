import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Review } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnChanges {
  @Input() review: Review
  imagePath: string

  ngOnChanges(): void {
    this.setImagePath()
  }

  setImagePath() {
    if (this.review.author_details.avatar_path) {
			this.imagePath = `${environment.IMAGE_URL}/${this.review.author_details.avatar_path}`;
		} else {
			this.imagePath = "../../../assets/default.svg.png";
		}
  }
}
