import {AuthGateway} from "../ports/auth.gateway";
import {LoginUser, RegisterUser, UpdateUserPayload, User} from "@models/user.model";
import {catchError, map, Observable, of} from "rxjs";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export class HttpAuthGateway implements AuthGateway {
  http = inject(HttpClient)
  url = environment.apiUrl;

  login(credentials: LoginUser): Observable<User> {
    return this.http.post<{ user: User }>(
      `${this.url}/users/login`,
      {user: credentials}
    ).pipe(
      map((response) => response.user),
      catchError(
        (err, caught) => {
          console.log(err, caught);
          return of(err)
        }
      )
    )
  }

  register(payload: RegisterUser): Observable<User> {
    return this.http.post<{ user: User }>(
      `${this.url}/users`,
      {user: payload}
    ).pipe(
      map((response) => response.user)
    )
  }

  user(): Observable<User> {
    return this.http.get<{ user: User }>(
      `${this.url}/user`
    ).pipe(
      map((response) => response.user)
    )
  }

  initAuth(): Observable<string | null> {
    return of(localStorage.getItem('token'));
  }

  storeToken(user: User): Observable<User> {
    localStorage.setItem('token', user.token)
    return of(user);
  }

  update(payload: UpdateUserPayload): Observable<User> {
    return this.http.put<{ user: User }>(
      `${this.url}/user`,
      {user: payload}
    ).pipe(
      map((response) => response.user)
    )
  }

  logout(): Observable<null> {
    localStorage.removeItem('token')
    return of(null);

  }

}
