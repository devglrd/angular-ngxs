import {Component, inject} from '@angular/core';
import ArticlesComponent from "./articles/articles.component";
import {Store} from "@ngxs/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {ArticlesSelector} from "../../../core/stores/articles/articles.selector";
import {NgIf} from "@angular/common";
import {RetrieveArticles} from "../../../core/stores/articles/articles.actions";
import {RouterLink} from "@angular/router";
import {BannerComponent} from "../../../shared/components/banner/banner.component";
import {TagsComponent} from "../../../shared/components/tags/tags.component";
import {PaginationComponent} from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ArticlesComponent, NgIf, RouterLink, BannerComponent, TagsComponent, PaginationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  store = inject(Store)
  articles = toSignal(
    this.store.select(ArticlesSelector.homeArticles()),
    {initialValue: []}
  )

  loading = toSignal(
    this.store.select(ArticlesSelector.loading()),
    {initialValue: true}
  )

  constructor() {
    this.store.dispatch(new RetrieveArticles())
  }

}
