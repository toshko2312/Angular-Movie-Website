import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Crew } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrl: '../cast/cast.component.css'
})
export class CrewComponent implements OnChanges {
  @Input() crew: Crew
  imagePath: string

  ngOnChanges(): void {
    this.setImagePath()
  }

  setImagePath() {
    if (this.crew.profile_path) {
			this.imagePath = `${environment.IMAGE_URL}/${this.crew.profile_path}`;
		} else {
			this.imagePath = "../../../assets/default.svg.png";
		}
  }
}
