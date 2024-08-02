import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Cast } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.css'
})
export class CastComponent implements OnChanges {
  @Input() cast: Cast
  imagePath: string

  ngOnChanges(): void {
    this.setImagePath()
  }

  setImagePath() {
    if (this.cast.profile_path) {
			this.imagePath = `${environment.IMAGE_URL}/${this.cast.profile_path}`;
		} else {
			this.imagePath = "../../../assets/default.svg.png";
		}
  }
}
