import {Article, Profile} from "@models/article.model";

export class RetrieveProfile {
  static readonly type = '[Profile] RetrieveProfile';

  constructor(public username: string) {
  }
}

export class ProfileRetrieved {
  static readonly type = '[Profile] ProfileRetrieved';

  constructor(public profile: Profile, public articles: Article[]) {
  }
}

export class RetrieveFavoritedArticleForProfile {
  static readonly type = '[Profile] RetrieveFavoritedArticleForProfile';

  constructor(public username: string) {
  }
}

export class FavoritedArticleForProfileRetrieved {
  static readonly type = '[Profile] FavoritedArticleForProfileRetrieved';

  constructor(public articles: Article[]) {
  }
}

export class UnFollowProfile {
  static readonly type = '[Profile] Unfollow a profile';

  constructor(public username: string, public slug?: string) {
  }
}


export class FollowProfile {
  static readonly type = '[Profile] follow a profile';

  constructor(public username: string, public slug?: string) {
  }
}
