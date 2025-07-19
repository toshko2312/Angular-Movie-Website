import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProfileService } from '../profile.service';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreState } from '../../shared/models';
import { selectRatedMovies } from '../store/profile.selectors';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit, OnDestroy {
  currentPage: WritableSignal<number> = signal(null);
  totalPages: WritableSignal<number> = signal(null);
  onDestroyed$ = new Subject<void>();

  constructor(
    private profileService: ProfileService,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.setStoreSubs();
  }

  // Set the new page and scroll to the top
  onPageChange(newPage: number) {
    this.profileService.setPage.set(newPage);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  // return new Array(number)
  createRange(n: number, mode: string) {
    const arr = [];

    if (mode == 'prev') {
      for (let i = n - 4; i < n; i++) {
        if (i > 0) {
          arr.push(i);
        }
      }
    } else if (mode == 'next') {
      for (let i = n + 1; i <= n + 4; i++) {
        if (i <= this.totalPages()) {
          arr.push(i);
        }
      }
    }
    return arr;
  }

  setStoreSubs() {
    this.store
      .select(selectRatedMovies)
      .pipe(takeUntil(this.onDestroyed$))
      .subscribe((data) => {
        this.currentPage.set(data.page);
        this.totalPages.set(data.total_pages);
      });
  }

  ngOnDestroy(): void {
    this.onDestroyed$.next();
  }
}
