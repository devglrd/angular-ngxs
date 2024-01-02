import {Observable} from "rxjs";
import {Article, ArticleComment, NewArticlePayload, Profile} from "@models/article.model";

export abstract class ArticlesGateway {
  abstract retrieveArticles(filter?: {author?: string, favorited?: string}): Observable<Article[]>;

  abstract retrieveFeed(): Observable<Article[]>;

  abstract retrieveTags(): Observable<string[]>;

  abstract retrieveArticle(slug: string): Observable<Article>;

  abstract retrieveProfile(username:string): Observable<Profile>;

  abstract retrieveComments(slug: string): Observable<ArticleComment[]>;

  abstract addComment(slug: string, comment: string): Observable<ArticleComment>;

  abstract deleteComment(slug: string, id: string): Observable<null>;

  abstract addFavorite(slug: string): Observable<Article>;

  abstract removeFavorite(slug: string): Observable<Article>;

  abstract followProfile(username: string): Observable<Profile>;

  abstract unFollowProfile(username: string): Observable<null>;

  abstract create(payload: NewArticlePayload): Observable<Article>;

  abstract update(slug: string, payload: NewArticlePayload): Observable<Article>;

  abstract deleteArticle(slug:string): Observable<null>;

}
