import {HttpInterceptorFn} from '@angular/common/http';
import {inject, signal} from "@angular/core";
import {Store} from "@ngxs/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthSelector} from "../../core/stores/auth/auth.selector";
import {catchError, EMPTY, of} from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get('No-Auth') == 'True') {
    return next(req);
  }
  const store = inject(Store);
  const token = toSignal(
    store.select(AuthSelector.token()),
    {initialValue: ''}
  )
  if (!!token()) {
    const options = {
      headers: req
        .headers
        .set('Authorization', `Bearer ${token()}`)
    }
    const duplicate = req.clone(options);
    return next(duplicate)
  }
  return next(req).pipe(
    catchError((err, caught) => {
      console.log(err, caught);
      return of(err.error.errors);
    })
  );
};
