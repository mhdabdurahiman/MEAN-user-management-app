import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import { state } from "@angular/animations";

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.isAuthenticated
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user.isAdmin
)

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
)