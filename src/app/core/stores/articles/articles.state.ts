import {inject, Injectable} from '@angular/core';
import {State, Action, StateContext} from '@ngxs/store';
import {
  ArticleCreated, ArticleDeleted,
  ArticleGet,
  ArticlesAction,
  ArticlesRetrieved, DeleteArticle, FeedRetrieved, GetArticle, NewArticle,
  RetrieveArticles, RetrieveFeed, ToogleFavoriteArticle, UpdateArticle
} from './articles.actions';
import {Article, ArticleComment} from "@models/article.model";
import {ArticlesGateway} from "../../ports/articles.gateway";
import {tap} from "rxjs";

export class ArticlesStateModel {
  public articles: Article[];
  public loading: boolean;
  public article: Article;
  public feed: Article[];
}

const defaults = {
  articles: [],
  feed: [],
  article: {} as Article,
  loading: false,
};

@State<ArticlesStateModel>({
  name: 'articles',
  defaults
})
@Injectable()
export class ArticlesState {
  articlesGateway = inject(ArticlesGateway)

  @Action(RetrieveArticles)
  retrieveArticle(ctx: StateContext<ArticlesStateModel>) {
    ctx.patchState({
      loading: true
    })
    return this.articlesGateway.retrieveArticles()
      .pipe(
        tap(articles => ctx.dispatch(new ArticlesRetrieved(articles)))
      )
  }

  @Action(ArticlesRetrieved)
  articlesRetrieved(ctx: StateContext<ArticlesStateModel>, {articles}: ArticlesRetrieved) {
    ctx.patchState({
      articles,
      loading: false
    })
  }

  @Action(GetArticle)
  getArticle(
    ctx: StateContext<ArticlesStateModel>,
    {slug}: GetArticle
  ) {
    ctx.patchState({
      loading: true
    })
    return this.articlesGateway.retrieveArticle(slug).pipe(
      tap(
        article => ctx.dispatch(new ArticleGet(article))
      )
    )
  }

  @Action(ArticleGet)
  articleGet(
    ctx: StateContext<ArticlesStateModel>,
    {article}: ArticleGet
  ) {
    ctx.patchState({
      article,
      loading: false
    })
  }

  @Action(ToogleFavoriteArticle)
  ToogleFavoriteArticle(
    ctx: StateContext<ArticlesStateModel>,
    {slug}: ToogleFavoriteArticle
  ) {
    const observable = !ctx.getState().article.favorited ? this.articlesGateway.addFavorite(slug) : this.articlesGateway.removeFavorite(slug)
    return observable.pipe(
      tap(() => {
        ctx.patchState({
          article: {...ctx.getState().article, favorited: !ctx.getState().article.favorited}
        })
      })
    )
  }

  @Action(RetrieveFeed)
  RetrieveFeed({patchState, dispatch}: StateContext<ArticlesStateModel>) {
    patchState({
      loading: true
    })
    return this.articlesGateway.retrieveFeed().pipe(
      tap(
        (articles) => dispatch(new FeedRetrieved(articles))
      )
    )
  }

  @Action(FeedRetrieved)
  FeedRetrieved({patchState}: StateContext<ArticlesStateModel>, {articles}: FeedRetrieved) {
    patchState({
      feed: articles,
      loading: false
    })
  }

  @Action(NewArticle)
  NewArticle({dispatch}: StateContext<ArticlesStateModel>, {payload}: NewArticle) {
    return this.articlesGateway.create(payload).pipe(
      tap(
        (article) => dispatch(new ArticleCreated(article.slug))
      )
    )
  }

  @Action(UpdateArticle)
  UpdateArticle({dispatch}: StateContext<ArticlesStateModel>, {slug, payload}: UpdateArticle) {
    return this.articlesGateway.update(slug, payload).pipe(
      tap(
        (article) => dispatch(new ArticleCreated(article.slug))
      )
    )
  }

  @Action(DeleteArticle)
  DeleteArticle({dispatch}: StateContext<ArticlesStateModel>, {slug}: DeleteArticle) {
    return this.articlesGateway.deleteArticle(slug).pipe(
      tap(
        () => dispatch(new ArticleDeleted())
      )
    )
  }

}
