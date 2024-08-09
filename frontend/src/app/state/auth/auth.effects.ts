// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { AuthService } from "../../auth/services/auth.service";
// import * as AuthActions from './auth.actions';
// import { Router } from "@angular/router";
// import { catchError, mergeMap, map, of, tap } from "rxjs";
// import { ToastrService } from "ngx-toastr";

// @Injectable()
// export class AuthEffects {
//   constructor(
//     private actions$: Actions,
//     private authService: AuthService,
//     private router: Router,
//     private toastr: ToastrService
//   ) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.login),
//       mergeMap(action =>
//         this.authService.loginUser({ email: action.email, password: action.password }).pipe(
//           map(response => AuthActions.loginSuccess({ user: response.user })),
//           catchError(error => of(AuthActions.loginFailure({ error })))
//         )
//       )
//     )
//   );

//   loginSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginSuccess),
//         tap(action => {
//           this.toastr.success('Login successful!', 'Success');

//           if(action.user.isAdmin) {
//             this.router.navigate(['/admin-dashboard'])
//           } else {
//             this.router.navigate(['/home'])
//           }
//         })
//       ),
//     { dispatch: false }
//   );

//   loginFailure$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginFailure),
//         tap(action => {
//           // Show error notification
//           this.toastr.error('Login failed', 'Failure');
//         })
//       ),
//     { dispatch: false }
//   );

//   logout$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.logout),
//         tap(() => this.router.navigate(['/login']))
//       ),
//     { dispatch: false }
//   );

//   loadAuthState$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType('[App] Initialize App'),
//       mergeMap(() => {
//         const authState = localStorage.getItem('authState');
//         if (authState) {
//           const parsedState = JSON.parse(authState);
//           return [AuthActions.loginSuccess({ user: parsedState.user })];
//         }
//         return [];
//       })
//     )
//   );
// }

// auth.effects.ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from "../../auth/services/auth.service";
import * as AuthActions from './auth.actions';
import { Router } from "@angular/router";
import { catchError, mergeMap, map, of, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.loginUser({ email: action.email, password: action.password }).pipe(
          map(response => AuthActions.loginSuccess({ user: response.user })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(action => {
          this.toastr.success('Login successful!', 'Success');

          localStorage.setItem('authState', JSON.stringify({
            isAuthenticated: true,
            isAdmin: action.user.isAdmin,
            user: action.user
          }));

          if (action.user.isAdmin) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('authState');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  loadAuthState$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Initialize App'),
      mergeMap(() => {
        const authState = localStorage.getItem('authState');
        if (authState) {
          const parsedState = JSON.parse(authState);
          return [AuthActions.loginSuccess({ user: parsedState.user })];
        }
        return [];
      })
    )
  );
}
