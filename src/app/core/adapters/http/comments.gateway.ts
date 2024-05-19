import {ArticleComment} from "@models/article.model";
import {map, Observable} from "rxjs";
import {CommentsGateway} from "../../ports/comments.gateway";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

export class HttpCommentsGateway implements CommentsGateway {
  http = inject(HttpClient)

  url = environment.apiUrl;

  retrieveComments(slug: string): Observable<ArticleComment[]> {
    return this.http.get<{
      comments: ArticleComment[]
    }>(`${this.url}/articles/${slug}/comments`)
      .pipe(
        map((response) => response.comments)
      );
  }

  addComment(slug: string, body: string): Observable<ArticleComment> {
    return this.http.post<{
      comment: ArticleComment
    }>(`${this.url}/articles/${slug}/comments`, {comment: {body}})
      .pipe(
        map((response) => response.comment)
      );
  }

  deleteComment(slug: string, id: string): Observable<null> {
    return this.http.delete<null>(`${this.url}/articles/${slug}/comments/${id}`)
  }


}
