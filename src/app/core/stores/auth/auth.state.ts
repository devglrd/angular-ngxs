import {inject, Injectable} from '@angular/core';
import {State, Action, StateContext} from '@ngxs/store';
import {User} from "@models/user.model";
import {AuthGateway} from "../../ports/auth.gateway";
import {
  AuthenticatedUser, AuthFailed, InitAuth, IsAuthenticatedUser, LoginError,
  LoginSubmitted,
  LoginSuccessful, Logout,
  RegisterSubmitted,
  RegisterSuccessful,
  UpdateUser
} from "./auth.actions";
import {catchError, EMPTY, of, switchMap, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

export class AuthStateModel {
  user: User | null;
  loading: boolean;
  token: string | null;
  isAuth: boolean | null;
  errors: any;
}

const defaults = {
  user: null,
  loading: false,
  token: null,
  isAuth: null,
  errors: {}
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState {
  authGateway = inject(AuthGateway);
  router = inject(Router);
  route = inject(ActivatedRoute);

  @Action(RegisterSubmitted)
  registerSubmitted(
    ctx: StateContext<AuthStateModel>,
    {payload}: RegisterSubmitted
  ) {
    ctx.patchState({
      loading: true
    })
    return this.authGateway.register(payload).pipe(
      tap((user) => ctx.dispatch(new RegisterSuccessful(user)))
    )
  }

  @Action(RegisterSuccessful)
  registerSuccessful({patchState}: StateContext<AuthStateModel>, {user}: RegisterSuccessful) {
    patchState({
      user,
      loading: false
    });
  }

  @Action(LoginSubmitted)
  loginSubmitted(ctx: StateContext<AuthStateModel>, {payload}: LoginSubmitted) {
    ctx.patchState({
      loading: true
    })
    return this.authGateway.login(payload).pipe(
      switchMap(
        (user) => this.authGateway.storeToken(user)
      ),
      tap(user => ctx.dispatch(new LoginSuccessful(user))),
      catchError(
        (err, caught) => {
          console.log(err, caught);
          return ctx.dispatch(new LoginError(err))
        }
      ),
    )
  }

  @Action(UpdateUser)
  UpdateUser({patchState}: StateContext<AuthStateModel>, {payload}: UpdateUser) {
    return this.authGateway.update(payload).pipe(
      tap(
        (user) => patchState({user})
      )
    )
  }

  @Action(LoginError)
  loginError({patchState}: StateContext<AuthStateModel>, {errors}: LoginError) {
    patchState({
      errors
    })
  }

  @Action(LoginSuccessful)
  loginSuccessful({patchState, dispatch}: StateContext<AuthStateModel>, {user}: LoginSuccessful) {
    patchState({
      user,
      loading: false
    });
    dispatch(new AuthenticatedUser(user.token))
  }

  @Action(AuthenticatedUser)
  AuthenticatedUser({patchState, dispatch}: StateContext<AuthStateModel>, {token}: AuthenticatedUser) {
    patchState({
      token
    })
    return this.authGateway.user().pipe(
      tap(user => patchState({user})),
      tap(
        () => dispatch(new IsAuthenticatedUser())
      )
    )
  }

  @Action(IsAuthenticatedUser)
  IsAuthenticatedUser({patchState}: StateContext<AuthStateModel>) {
    patchState({
      isAuth: true
    })
  }

  @Action(InitAuth)
  initAuth({patchState, dispatch}: StateContext<AuthStateModel>) {
    return this.authGateway.initAuth().pipe(
      tap((token) => {
        if (!token) return dispatch(new AuthFailed());
        return dispatch(new AuthenticatedUser(token));
      })
    )
  }

  @Action(AuthFailed)
  AuthFailed({patchState}: StateContext<AuthStateModel>) {
    patchState({
      isAuth: false,
      user: null,
      token: null,
    })
  }


  @Action(Logout)
  logout({patchState}: StateContext<AuthStateModel>) {
    patchState(defaults)
    return this.authGateway.logout().pipe(
      tap(
        () => {
        }
      )
    )
  }
}
