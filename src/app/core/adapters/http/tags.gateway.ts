import {map, Observable} from "rxjs";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {TagsGateway} from "../../ports/tags.gateway";

export class HttpTagsGateway implements TagsGateway {
  http = inject(HttpClient)

  url = environment.apiUrl;

  retrieveTags(): Observable<string[]> {
    return this.http.get<{ tags: string[] }>(
      `${this.url}/tags`
    ).pipe(
      map((response) => response.tags)
    )
  }


}
