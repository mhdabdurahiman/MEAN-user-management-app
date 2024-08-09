import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as AuthActions from "./state/auth/auth.actions"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {}
  title = 'user-management-frontend';

  ngOnInit(): void {
    this.store.dispatch({ type: '[App] Initialize App' })
  }
}
