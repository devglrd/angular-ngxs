import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {Store} from "@ngxs/store";
import {AuthSelector} from "../../core/stores/auth/auth.selector";
import {toSignal} from "@angular/core/rxjs-interop";
import {filter, map, Observable, take, tap} from "rxjs";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  return store.select(AuthSelector.isAuth()).pipe(
    filter(isAuth => isAuth !== null),
    take(1),
    tap((auth) => console.log(auth)),
    map(isAuth => Boolean(isAuth))
  );
};
