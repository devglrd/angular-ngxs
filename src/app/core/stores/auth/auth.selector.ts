import {createPropertySelectors, createSelector} from "@ngxs/store";
import {AuthState, AuthStateModel} from "./auth.state";

export class AuthSelector {

  static slices = createPropertySelectors<AuthStateModel>(AuthState)

  static loading() {
    return createSelector(
      [AuthSelector.slices.loading],
      (loading) => loading
    )
  }

  static token() {
    return createSelector(
      [AuthSelector.slices.token],
      (token) => token
    )
  }

  static user() {
    return createSelector(
      [AuthSelector.slices.user],
      (user) => user
    )
  }

  static isAuth() {
    return createSelector(
      [AuthSelector.slices.isAuth],
      (isAuth) => isAuth
    )
  }
  static errors() {
    return createSelector(
      [AuthSelector.slices.errors],
      (errors) => errors
    )
  }
}
