import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: any;
  error: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  error: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    isAdmin: user.isAdmin,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logout, state => ({
    ...state,
    isAuthenticated: false,
    isAdmin: false,
    user: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}