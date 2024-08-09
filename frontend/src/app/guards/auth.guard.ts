import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Observable, of } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import * as fromAuth from '../state/auth/auth.reducer';
import * as AuthSelectors from '../state/auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(AuthSelectors.selectIsAuthenticated),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      }),
      map(isAuthenticated => isAuthenticated) // Ensure it returns boolean
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(AuthSelectors.selectIsAdmin), 
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/home']);
        }
      }),
      map(isAdmin => isAdmin)
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(AuthSelectors.selectIsAuthenticated),
      tap(isAuthenticated => {
        if (isAuthenticated) {
          this.store.pipe(select(AuthSelectors.selectIsAdmin)).subscribe(isAdmin => {
            if (isAdmin) {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          });
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    );
  }
}

