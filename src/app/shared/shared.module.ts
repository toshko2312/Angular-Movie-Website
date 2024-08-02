import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    LoadingComponent
  ],
  declarations: [
    LoadingComponent
  ],
  providers: [],
})
export class SharedModule { }