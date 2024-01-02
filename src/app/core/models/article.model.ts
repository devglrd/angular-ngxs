export interface Article {
  id: string;
  slug: string
  title: string
  description: string
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
  author: Profile;
  favorited: boolean;
}

export interface Profile {
  id: string;
  username: string;
  bio: string;
  image: string;
  following: boolean
}

export interface SummaryArticle {
  title: string,
  description: string;
  slug: string;
  tags: string[];
  author: Profile;
  favoritesCount: number;
  createdAt: Date;
  favorited: boolean;
}

export interface ArticleComment {
  body: string;
  author: Profile;
  id: string;
  createdAt: Date
}

export interface NewArticlePayload {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
