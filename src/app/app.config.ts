import { provideAnimations } from "@angular/platform-browser/animations";
import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import { provideClientHydration } from '@angular/platform-browser';
import { registerLocaleData } from "@angular/common";
import {NgxsModule, Store} from "@ngxs/store";
import {of} from "rxjs";
import {routes} from "./app.routes";
import {ArticlesGateway} from "./core/ports/articles.gateway";
import {HttpArticleGateway} from "./core/adapters/http-article.gateway";
import {ArticlesState} from "./core/stores/articles/articles.state";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthGateway} from "./core/ports/auth.gateway";
import {HttpAuthGateway} from "./core/adapters/http-auth.gateway";
import {AuthState} from "./core/stores/auth/auth.state";
import {httpInterceptor} from "./shared/interceptors/http.interceptor";
import {InitAuth} from "./core/stores/auth/auth.actions";
import {CommentsState} from "./core/stores/comments/comments.state";
import {ProfileState} from "./core/stores/profile/profile.state";
import {TagsState} from "./core/stores/tags/tags.state";

registerLocaleData(localeFr, 'fr');
export function initApp(store: Store) {
  return () => store.dispatch(new InitAuth());
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([ArticlesState, AuthState, CommentsState, ProfileState, TagsState]),
    ),
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: ArticlesGateway, useFactory: () => new HttpArticleGateway()},
    {provide: AuthGateway, useFactory: () => new HttpAuthGateway()},
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [Store],
      multi: true
    }
  ]
};
