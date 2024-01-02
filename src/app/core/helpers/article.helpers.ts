import {Article, SummaryArticle} from "@models/article.model";

export const articleToSummaryArticle = (articles: Article[]) => {
  return articles.map(
    article => ({
      title: article.title,
      description: article.description,
      slug: article.slug,
      tags: article.tagList,
      favoritesCount: article.favoritesCount,
      favorited: article.favorited,
      author: article.author,
      createdAt: article.createdAt,
    } as SummaryArticle)
  )
}
