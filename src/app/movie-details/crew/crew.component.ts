import {
  Component,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Crew } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrl: '../cast/cast.component.css',
})
export class CrewComponent implements OnInit {
  crew = input.required<Crew>();
  imagePath: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.setImagePath();
  }

  setImagePath() {
    if (this.crew().profile_path) {
      this.imagePath.set(
        `${environment.IMAGE_URL}/${this.crew().profile_path}`
      );
    } else {
      this.imagePath.set('../../../assets/default.svg.png');
    }
  }
}
