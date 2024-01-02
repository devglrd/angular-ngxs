import {inject, Injectable} from '@angular/core';
import {State, Action, StateContext} from '@ngxs/store';
import {Article, Profile} from "@models/article.model";
import {ArticlesGateway} from "../../ports/articles.gateway";
import {
  FavoritedArticleForProfileRetrieved,
  FollowProfile,
  ProfileRetrieved,
  RetrieveFavoritedArticleForProfile,
  RetrieveProfile,
  UnFollowProfile
} from "./profile.actions";
import {combineLatest, merge, of, tap} from "rxjs";
import {GetArticle} from "../articles/articles.actions";

export class ProfileStateModel {
  public profile: Profile;
  public articles: Article[];
}

const defaults = {
  profile: {} as Profile,
  articles: [] as Article[]
};

@State<ProfileStateModel>({
  name: 'profile',
  defaults
})
@Injectable()
export class ProfileState {
  articlesGateway = inject(ArticlesGateway)

  @Action(RetrieveProfile)
  RetrieveProfile({dispatch}: StateContext<ProfileStateModel>, {username}: RetrieveProfile) {
    return combineLatest([this.articlesGateway.retrieveProfile(username), this.articlesGateway.retrieveArticles({author: username})])
      .pipe(
        tap(
          ([profile, articles]) => dispatch(new ProfileRetrieved(profile, articles))
        )
      )
  }

  @Action(RetrieveFavoritedArticleForProfile)
  RetrieveFavoritedArticleForProfile({dispatch}: StateContext<ProfileStateModel>, {username}: RetrieveFavoritedArticleForProfile) {
    return this.articlesGateway.retrieveArticles({favorited: username})
      .pipe(
        tap(
          (articles) => dispatch(new FavoritedArticleForProfileRetrieved(articles))
        )
      )
  }

  @Action(FavoritedArticleForProfileRetrieved)
  FavoritedArticleForProfileRetrieved({patchState}: StateContext<ProfileStateModel>, {articles}: FavoritedArticleForProfileRetrieved) {
    patchState({
      articles
    })
  }

  @Action(ProfileRetrieved)
  ProfileRetrieved({patchState}: StateContext<ProfileStateModel>, {profile, articles}: ProfileRetrieved) {
    patchState({
      profile,
      articles
    })
  }


  @Action(FollowProfile)
  followProfile({patchState, dispatch}: StateContext<ProfileStateModel>, {username, slug}: FollowProfile) {
    return this.articlesGateway.followProfile(username).pipe(
      tap(() => !!slug ? dispatch(new GetArticle(slug)) : of(null))
    )
  }

  @Action(UnFollowProfile)
  unFollowProfile({patchState, dispatch}: StateContext<ProfileStateModel>, {username, slug}: UnFollowProfile) {
    console.log(`unFollowProfile`);
    return this.articlesGateway.unFollowProfile(username).pipe(
      tap(() => !!slug ? dispatch(new GetArticle(slug)) : of(null))
    )
  }
}
