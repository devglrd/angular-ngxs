import {Article, ArticleComment, NewArticlePayload} from "@models/article.model";

export class ArticlesAction {
  static readonly type = '[Articles] Add item';
  constructor(public payload: string) { }
}

export class RetrieveArticles {
  static readonly type = '[Articles] Retieve article';

  constructor() {
  }
}

export class ArticlesRetrieved {
  static readonly type = '[Articles] Article retieved ';

  constructor(public articles: Article[]) {
  }
}

export class GetArticle {
  static readonly type = '[Articles] Get Article ';

  constructor(public slug: string) {
  }
}
export class ArticleGet {
  static readonly type = '[Articles] Article get';

  constructor(public article: Article) {
  }
}
export class ToogleFavoriteArticle{
  static readonly type = '[Articles] Toogle favorite article';

  constructor(public slug: string) {
  }
}
export class RetrieveFeed{
  static readonly type = '[Articles] RetrieveFeed';

  constructor() {
  }
}

export class DeleteArticle{
  static readonly type = '[Articles] Delete Article';

  constructor(public slug:string) {
  }
}

export class ArticleDeleted{
  static readonly type = '[Articles] ArticleDeleted';

  constructor() {
  }
}

export class FeedRetrieved{
  static readonly type = '[Articles] FeedRetrieved';

  constructor(public articles: Article[]) {
  }
}

export class NewArticle{
  static readonly type = '[Articles] NewArticle';

  constructor(public payload: NewArticlePayload) {
  }
}

export class UpdateArticle{
  static readonly type = '[Articles] UpdateArticle';

  constructor(public slug: string,  public payload: NewArticlePayload) {
  }
}
export class ArticleCreated{
  static readonly type = '[Articles] ArticleCreated';

  constructor(public slug: string) {
  }
}

