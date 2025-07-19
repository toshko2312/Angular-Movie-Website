import {
  Component,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cast } from '../../shared/models';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.css',
})
export class CastComponent implements OnInit {
  cast = input.required<Cast>();
  imagePath: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.setImagePath();
  }

  setImagePath() {
    if (this.cast().profile_path) {
      this.imagePath.set(
        `${environment.IMAGE_URL}/${this.cast().profile_path}`
      );
    } else {
      this.imagePath.set('../../../assets/default.svg.png');
    }
  }
}
