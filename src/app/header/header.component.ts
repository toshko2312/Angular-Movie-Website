import { Component, OnInit, Signal, computed } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  loggedIn: Signal<boolean> = computed(() => this.authService.onLogIn())

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if there is already a session stored
    this.checkSessionId()

    if(!this.loggedIn()) {
      // If not logged in check if new request token has been approved and create new session
      this.checkParams()
    }
  }

  onLoginOrLogout() {
    if (!this.loggedIn()) {
      this.authService.createRequestToken();
    } else {
      this.authService.logout()
    }
  }

  checkParams() {
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        // Initialize login if the url has a request token
        if(params['request_token'] && !sessionStorage.getItem("sessionId")) {
          this.authService.login(params['request_token'])
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkSessionId() {
    if(sessionStorage.getItem('sessionId')) {
      this.authService.onLogIn.set(true)
    }
  }
}
