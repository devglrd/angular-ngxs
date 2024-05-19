import {Observable} from "rxjs";
import {Article, ArticleComment, NewArticlePayload, Profile} from "@models/article.model";

export abstract class ArticlesGateway {
  abstract retrieveArticles(filter?: {author?: string, favorited?: string}): Observable<Article[]>;

  abstract retrieveFeed(): Observable<Article[]>;

  abstract retrieveArticle(slug: string): Observable<Article>;

  abstract addFavorite(slug: string): Observable<Article>;

  abstract removeFavorite(slug: string): Observable<Article>;

  abstract create(payload: NewArticlePayload): Observable<Article>;

  abstract update(slug: string, payload: NewArticlePayload): Observable<Article>;

  abstract deleteArticle(slug:string): Observable<null>;

}
