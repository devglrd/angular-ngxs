import {Component, inject, Input, signal} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {Action, Actions, ofAction, ofActionSuccessful, Store} from "@ngxs/store";
import {Article, SummaryArticle} from "@models/article.model";
import {
  ArticleDeleted,
  DeleteArticle,
  ToogleFavoriteArticle
} from "../../../../../core/stores/articles/articles.actions";
import {FollowProfile, UnFollowProfile} from "../../../../../core/stores/profile/profile.actions";
import {toSignal} from "@angular/core/rxjs-interop";
import {ArticlesSelector} from "../../../../../core/stores/articles/articles.selector";
import {AuthSelector} from "../../../../../core/stores/auth/auth.selector";
import {User} from "@models/user.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent {

  @Input({required: true}) slug: string;
  router = inject(Router);
  store = inject(Store);
  actions = inject(Actions)
  article = toSignal(
    this.store.select(ArticlesSelector.article()),
    {initialValue: {} as Article}
  )

  user = toSignal(
    this.store.select(AuthSelector.user()),
    {initialValue: {} as User}
  )

  constructor() {
    this.actions.pipe(
      ofAction(
        ArticleDeleted
      )
    ).subscribe(() => this.router.navigateByUrl('/'))
  }


  addToFavorite(slug: string | undefined) {
    if (!slug) return;
    this.store.dispatch(new ToogleFavoriteArticle(slug))
  }

  following(username: string | undefined) {
    if (!username) return;
    this.store.dispatch(new FollowProfile(username, this.slug))
  }

  unFollowing(username: string | undefined) {
    if (!username) return;
    this.store.dispatch(new UnFollowProfile(username, this.slug))
  }

  deleteArticle() {
    this.store.dispatch(new DeleteArticle(this.slug))
  }
}
