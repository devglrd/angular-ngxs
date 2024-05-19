import {ProfileGateway} from "../../ports/profile.gateway";
import {map, Observable} from "rxjs";
import {Profile} from "@models/article.model";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

export class HttpProfileGateway implements ProfileGateway {

  http = inject(HttpClient)

  url = environment.apiUrl;

  retrieveProfile(username: string): Observable<Profile> {
    return this.http.get<{ profile: Profile }>(
      `${this.url}/profiles/${username}`
    ).pipe(
      map((response) => response.profile)
    )
  }

  followProfile(username: string): Observable<Profile> {
    return this.http.post<{
      profile: Profile
    }>(`${this.url}/profiles/${username}/follow`, {}).pipe(map(response => response.profile))
  }

  unFollowProfile(username: string): Observable<null> {
    return this.http.delete<null>(`${this.url}/profiles/${username}/follow`, {})
  }

}
