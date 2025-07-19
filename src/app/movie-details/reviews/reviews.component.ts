import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { Review } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  review = input.required<Review>()
  imagePath: WritableSignal<string> = signal('')

  ngOnInit(): void {
    this.setImagePath()
  }

  setImagePath() {
    if (this.review().author_details.avatar_path) {
			this.imagePath.set(`${environment.IMAGE_URL}/${this.review().author_details.avatar_path}`)
		} else {
			this.imagePath.set("../../../assets/default.svg.png")
		}
  }
}
