import {provideAnimations} from "@angular/platform-browser/animations";
import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter, Routes, withViewTransitions} from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {NgxsModule, Store} from "@ngxs/store";
import {routes} from "./app.routes";
import {ArticlesGateway} from "./core/ports/articles.gateway";
import {HttpArticleGateway} from "./core/adapters/http/articles.gateway";
import {ArticlesState} from "./core/stores/articles/articles.state";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthGateway} from "./core/ports/auth.gateway";
import {HttpAuthGateway} from "./core/adapters/http/auth.gateway";
import {AuthState} from "./core/stores/auth/auth.state";
import {httpInterceptor} from "./shared/interceptors/http.interceptor";
import {InitAuth} from "./core/stores/auth/auth.actions";
import {CommentsState} from "./core/stores/comments/comments.state";
import {ProfileState} from "./core/stores/profile/profile.state";
import {TagsState} from "./core/stores/tags/tags.state";
import {CommentsGateway} from "./core/ports/comments.gateway";
import {HttpCommentsGateway} from "./core/adapters/http/comments.gateway";
import {TagsGateway} from "./core/ports/tags.gateway";
import {HttpTagsGateway} from "./core/adapters/http/tags.gateway";
import {ProfileGateway} from "./core/ports/profile.gateway";
import {HttpProfileGateway} from "./core/adapters/http/profile.gateway";

registerLocaleData(localeFr, 'fr');

export function initApp(store: Store) {
  return () => store.dispatch(new InitAuth());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(
      NgxsModule.forRoot([ArticlesState, AuthState, CommentsState, ProfileState, TagsState]),
    ),
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: ArticlesGateway, useFactory: () => new HttpArticleGateway()},
    {provide: AuthGateway, useFactory: () => new HttpAuthGateway()},
    {provide: ProfileGateway, useFactory: () => new HttpProfileGateway()},
    {provide: CommentsGateway, useFactory: () => new HttpCommentsGateway()},
    {provide: TagsGateway, useFactory: () => new HttpTagsGateway()},
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [Store],
      multi: true
    }
  ]
};
