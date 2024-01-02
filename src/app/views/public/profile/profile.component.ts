import {Component, inject, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {GetArticle} from "../../../core/stores/articles/articles.actions";
import {
  FollowProfile,
  RetrieveFavoritedArticleForProfile,
  RetrieveProfile,
  UnFollowProfile
} from "../../../core/stores/profile/profile.actions";
import {toSignal} from "@angular/core/rxjs-interop";
import {ProfileSelector} from "../../../core/stores/profile/profile.selector";
import {Article, Profile, SummaryArticle} from "@models/article.model";
import {AuthSelector} from "../../../core/stores/auth/auth.selector";
import {User} from "@models/user.model";
import {NgIf} from "@angular/common";
import ArticlesComponent from "../home/articles/articles.component";
import {PaginationComponent} from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    ArticlesComponent,
    ArticlesComponent,
    PaginationComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {

  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  profile = toSignal(
    this.store.select(ProfileSelector.profile()),
    {initialValue: {} as Profile}
  )

  articles = toSignal(
    this.store.select(ProfileSelector.articles()),
    {initialValue: [] as SummaryArticle[]}
  )

  user = toSignal(
    this.store.select(AuthSelector.user()),
    {
      initialValue: {} as User
    }
  )

  username : string;
  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get("username")!;
      this.store.dispatch(new RetrieveProfile(this. username))
    })

    this.route.queryParams.subscribe((params) => {
      if(params['favorited']){
        this.store.dispatch(new RetrieveFavoritedArticleForProfile(this.username))
      }
    })
  }


  follow(username: string | undefined) {
    if (!username) return;
    this.store.dispatch(new FollowProfile(username))

  }


  unfollow(username: string | undefined) {
    if (!username) return;
    this.store.dispatch(new UnFollowProfile(username))

  }
}
