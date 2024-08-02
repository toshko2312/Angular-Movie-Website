import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import {
  DeleteSessionData,
  RequestTokenData,
  SessionIdData,
} from '../shared/models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  onLogIn: WritableSignal<boolean> = signal(false)

  // Create session id and set logIn flag to true
  login(request_token: string) {
    this.http
      .post<SessionIdData>(
        `${environment.SESSION_URL}/new`,
        { request_token: request_token },
        {
          headers: {
            Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN,
          },
        }
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            sessionStorage.setItem('sessionId', data.session_id);
            this.onLogIn.set(true);
            this.router.navigate([]).then(() => {
              if(this.router.url.includes('details')) {
                window.location.reload()
              }
            })
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Delete session id and set logIn flag to false
  logout() {
    this.http.delete<DeleteSessionData>(environment.SESSION_URL, {
      headers: {
        Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN,
      },
      body: {
        session_id: sessionStorage.getItem('sessionId'),
      },
    }).subscribe({
      next: (data) => {
        if(data.success) {
          this.onLogIn.set(false)
          sessionStorage.removeItem('sessionId')
          if(this.router.url.includes('details') || this.router.url.includes('profile')) {
            window.location.reload()
          }
        }
      },
      error: (err) => {
        console.log(err);
        this.onLogIn.set(false)
        sessionStorage.removeItem('sessionId')
      }
    })
  }

  // Create a request token and redirect the user to approve it
  createRequestToken() {
    return this.http
      .get<RequestTokenData>(environment.REQUEST_TOKEN_URL, {
        headers: {
          Authorization: 'Bearer ' + environment.API_READ_ACCESS_TOKEN,
        },
      })
      .subscribe({
        next: (data) => {
          window.location.href = `${environment.AUTHENTICATE_URL}${
            data.request_token
          }?redirect_to=${environment.BASE_URL + this.router.url}`;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
