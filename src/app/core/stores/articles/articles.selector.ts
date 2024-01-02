import {createPropertySelectors, createSelector} from "@ngxs/store";
import {ArticlesState, ArticlesStateModel} from "./articles.state";
import {SummaryArticle} from "@models/article.model";
import {articleToSummaryArticle} from "../../helpers/article.helpers";

export class ArticlesSelector {

  static slices = createPropertySelectors<ArticlesStateModel>(ArticlesState)


  static homeArticles() {
    return createSelector(
      [ArticlesSelector.slices.articles],
      (articles) => (articleToSummaryArticle(articles))
    )
  }

  static feed() {
    return createSelector(
      [ArticlesSelector.slices.feed],
      (articles) => (articleToSummaryArticle(articles))
    )
  }

  static loading() {
    return createSelector(
      [ArticlesSelector.slices.loading],
      (loading) => loading
    )
  }

  static article() {
    return createSelector(
      [ArticlesSelector.slices.article],
      (article) => article
    )
  }
}
