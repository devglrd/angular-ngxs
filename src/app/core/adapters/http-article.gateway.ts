import {ArticlesGateway} from "../ports/articles.gateway";
import {map, merge, Observable, of, tap} from "rxjs";
import {Article, ArticleComment, NewArticlePayload, Profile} from "@models/article.model";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export class HttpArticleGateway implements ArticlesGateway {

  http = inject(HttpClient)

  url = environment.apiUrl;

  retrieveArticles(filter?: { author: string }): Observable<Article[]> {
    return this.http.get<{ articles: Article[], articlesCount: number }>(
      `${this.url}/articles?${new URLSearchParams(filter)}`
    ).pipe(
      map((response) => response.articles)
    )
  }

  retrieveFeed(): Observable<Article[]> {
    return this.http.get<{ articles: Article[], articlesCount: number }>(
      `${this.url}/articles/feed`
    ).pipe(
      map((response) => response.articles)
    )
  }

  retrieveProfile(username: string): Observable<Profile> {
    return this.http.get<{ profile: Profile }>(
      `${this.url}/profiles/${username}`
    ).pipe(
      map((response) => response.profile)
    )
  }

  retrieveTags(): Observable<string[]> {
    return this.http.get<{ tags: string[] }>(
      `${this.url}/tags`
    ).pipe(
      map((response) => response.tags)
    )
  }

  retrieveArticle(slug: string): Observable<Article> {
    return this.http.get<{ article: Article }>(`${this.url}/articles/${slug}`)
      .pipe(
        map((response) => response.article)
      );
  }

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

  addFavorite(slug: string): Observable<Article> {
    return this.http.post<Article>(`${this.url}/articles/${slug}/favorite`, {})

  }

  removeFavorite(slug: string): Observable<Article> {
    return this.http.delete<Article>(`${this.url}/articles/${slug}/favorite`, {})
  }

  followProfile(username: string): Observable<Profile> {
    return this.http.post<{
      profile: Profile
    }>(`${this.url}/profiles/${username}/follow`, {}).pipe(map(response => response.profile))
  }

  unFollowProfile(username: string): Observable<null> {
    return this.http.delete<null>(`${this.url}/profiles/${username}/follow`, {})
  }

  create(payload: NewArticlePayload): Observable<Article> {
    return this.http.post<{article : Article}>(`${this.url}/articles`, {article: payload}).pipe(
      map(
        article => article.article
      )
    )
  }

  update(slug: string, payload: NewArticlePayload): Observable<Article> {
    return this.http.put<{article : Article}>(`${this.url}/articles/${slug}`, {article: payload}).pipe(
      map(
        article => article.article
      )
    )
  }

   deleteArticle(slug: string): Observable<null> {
     return this.http.delete<null>(`${this.url}/articles/${slug}`)
  }
}
