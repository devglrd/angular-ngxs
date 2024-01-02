import {Component, inject, Input, signal} from '@angular/core';
import {SummaryArticle} from "@models/article.model";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Store} from "@ngxs/store";
import {ToogleFavoriteArticle} from "../../../../core/stores/articles/articles.actions";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export default class ArticlesComponent {
  @Input() set articles(articles: SummaryArticle[]) {
    this.values.set(articles);
  }

  readonly values = signal([] as SummaryArticle[]);

  store = inject(Store)

  favorite(slug: string | undefined) {
    if (!slug) return;
    this.store.dispatch(new ToogleFavoriteArticle(slug)).subscribe(
      () => {
        const articles = this.values();
        const article = articles.find((article) => article.slug === slug);
        if (!!article) {
          article.favoritesCount = article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1;
          article.favorited = !article.favorited
        }
        this.values.set(articles);
      }
    )
  }
}
