import {Observable} from "rxjs";
import {ArticleComment} from "@models/article.model";

export abstract class CommentsGateway {
  abstract retrieveComments(slug: string): Observable<ArticleComment[]>;

  abstract addComment(slug: string, comment: string): Observable<ArticleComment>;

  abstract deleteComment(slug: string, id: string): Observable<null>;

}
