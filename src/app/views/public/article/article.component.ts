import {Component, computed, inject, Input} from '@angular/core';
import {Store} from "@ngxs/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {GetArticle, ToogleFavoriteArticle} from "../../../core/stores/articles/articles.actions";
import {ArticlesSelector} from "../../../core/stores/articles/articles.selector";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CommentsComponent} from "./components/comments/comments.component";
import {Article} from "@models/article.model";
import {InnerHTMLPipe} from "../../../shared/pipes/inner-html.pipe";
import {AuthSelector} from "../../../core/stores/auth/auth.selector";
import {User} from "@models/user.model";
import {ActionsComponent} from "./components/actions/actions.component";


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    CommentsComponent,
    RouterLink,
    InnerHTMLPipe,
    ActionsComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export default class ArticleComponent {
  slug: string = '';
  route = inject(ActivatedRoute)

  store = inject(Store);

  article = toSignal(
    this.store.select(ArticlesSelector.article()),
    {initialValue: {} as Article}
  )

  loading = toSignal(
    this.store.select(ArticlesSelector.loading()),
    {initialValue: true}
  )

  user = toSignal(
    this.store.select(AuthSelector.user()),
    {initialValue: {} as User}
  )
  author = computed(() => this.article().author)

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug')!
    this.slug = slug;
    this.store.dispatch(new GetArticle(slug))
  }
}
