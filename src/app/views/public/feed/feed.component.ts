import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {Store} from "@ngxs/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {ArticlesSelector} from "../../../core/stores/articles/articles.selector";
import {RetrieveArticles, RetrieveFeed} from "../../../core/stores/articles/articles.actions";
import ArticlesComponent from "../home/articles/articles.component";
import {BannerComponent} from "../../../shared/components/banner/banner.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TagsComponent} from "../../../shared/components/tags/tags.component";
import {PaginationComponent} from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    NgIf,
    ArticlesComponent,
    BannerComponent,
    RouterLink,
    RouterLinkActive,
    TagsComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export default class FeedComponent {
  store = inject(Store)
  articles = toSignal(
    this.store.select(ArticlesSelector.feed()),
    {initialValue: []}
  )

  loading = toSignal(
    this.store.select(ArticlesSelector.loading()),
    {initialValue: true}
  )

  constructor() {
    this.store.dispatch(new RetrieveFeed())
  }
}
