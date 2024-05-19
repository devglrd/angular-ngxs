import {Observable} from "rxjs";

export abstract class TagsGateway{
  abstract retrieveTags(): Observable<string[]>;
}
