import {map, merge, Observable, of, tap} from "rxjs";
import {Article, ArticleComment, NewArticlePayload, Profile} from "@models/article.model";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArticlesGateway} from "../../ports/articles.gateway";
import {environment} from "../../../../environments/environment";

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



  retrieveArticle(slug: string): Observable<Article> {
    return this.http.get<{ article: Article }>(`${this.url}/articles/${slug}`)
      .pipe(
        map((response) => response.article)
      );
  }
  addFavorite(slug: string): Observable<Article> {
    return this.http.post<Article>(`${this.url}/articles/${slug}/favorite`, {})

  }

  removeFavorite(slug: string): Observable<Article> {
    return this.http.delete<Article>(`${this.url}/articles/${slug}/favorite`, {})
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
