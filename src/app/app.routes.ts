import {Routes} from '@angular/router';
import {LayoutComponent as PublicLayout} from "./views/public/layout/layout.component";
import {isAuthenticatedGuard} from "./shared/guard/is-authenticated.guard";


export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./views/public/home/home.component'),
      },
      {
        path: 'feed',
        loadComponent: () => import('./views/public/feed/feed.component'),
      },
      {
        path: 'article/:slug',
        loadComponent: () => import('./views/public/article/article.component'),
      },
      {
        path: 'profile/:username',
        loadComponent: () => import('./views/public/profile/profile.component')
      },
      {
        path: 'editor',
        loadComponent: () => import('./views/public/editor/editor.component')
      },
      {
        path: 'editor/:slug',
        loadComponent: () => import('./views/public/editor/editor.component')
      },
      {
        path: 'settings',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./views/public/settings/settings.component')
      },
      {
        path: 'login',
        loadComponent: () => import('./views/public/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./views/public/register/register.component')
      },
      {
        path: '*',
        redirectTo: '',
      }
    ]
  }
];
