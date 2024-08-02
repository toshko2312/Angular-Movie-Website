import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RatingCardsComponent } from './rating-cards/rating-cards.component';
import { PaginationComponent } from './pagination/pagination.component';

const components = [
  ProfileComponent,
  RatingCardsComponent,
  PaginationComponent
];

@NgModule({
  declarations: components,
  exports: [],
  imports: [SharedModule, ProfileRoutingModule, FormsModule],
})
export class ProfileModule {}