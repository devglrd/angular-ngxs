import {Observable} from "rxjs";
import {LoginUser, RegisterUser, UpdateUserPayload, User} from "@models/user.model";

export abstract class AuthGateway{
  abstract logout(): Observable<null>;

  abstract login(credentials: LoginUser): Observable<User>;
  abstract register(payload : RegisterUser): Observable<User>;
  abstract user(): Observable<User>;
  abstract initAuth(): Observable<string | null>;
  abstract storeToken(user:User): Observable<User>;
  abstract update(payload: UpdateUserPayload): Observable<User>;
}
