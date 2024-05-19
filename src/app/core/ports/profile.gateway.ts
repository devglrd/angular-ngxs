import {Observable} from "rxjs";
import {Profile} from "@models/article.model";

export abstract class ProfileGateway {
  abstract retrieveProfile(username:string): Observable<Profile>;

  abstract followProfile(username: string): Observable<Profile>;

  abstract unFollowProfile(username: string): Observable<null>;
}
