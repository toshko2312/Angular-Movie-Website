import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { AppState, ProfileDetailsData, RatedMoviesData } from '../shared/models';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { setProfileDetails } from './store/profile.actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  setPage: WritableSignal<number> = signal(1)

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchProfileDetails = () => {
    let params = new HttpParams().set(
      'session_id',
      sessionStorage.getItem('sessionId')
    );

    return this.http.get<ProfileDetailsData>(environment.PROFILE_URL, {
      headers: { Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN },
      params: params,
    }).pipe(map((data) => {
      if(data.avatar.tmdb.avatar_path) {
        return data
      } else {
        return {
          ...data,
          avatar: {
            ...data.avatar,
            tmdb: {
              avatar_path: '../../assets/default.svg.png'
            }
          }
        }
      }
    })).subscribe({
      next: (data) => {
        this.store.dispatch(setProfileDetails({profileDetails: data}))
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  fetchProfileRatings(page: number) {
    let params = new HttpParams()
    .set('session_id', sessionStorage.getItem('sessionId'))
    .set('language', 'en-US')
    .set('page', page)
    .set('sort_by', 'created_at.desc')

    return this.http.get<RatedMoviesData>(`${environment.PROFILE_URL}/account_id/rated/movies`, {
      headers: { Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN },
      params: params,
    }).pipe(map((data) => {
      for (let index = 0; index < data.results.length; index++) {
        const movie = data.results[index];
        
        if(!movie.poster_path) {
          movie.poster_path = '../../assets/default.svg.png'
        } else {
          movie.poster_path = `${environment.IMAGE_URL}/${movie.poster_path}`
        }
      }
      return data
    }))
  }
}
