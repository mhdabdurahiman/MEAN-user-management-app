import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../state/auth/auth.actions'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService, private store: Store) { }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
