import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {RegisterSubmitted} from "../../../core/stores/auth/auth.actions";
import {RegisterUser} from "@models/user.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthSelector} from "../../../core/stores/auth/auth.selector";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export default class RegisterComponent {

  store = inject(Store);

  router = inject(Router);
  route = inject(ActivatedRoute);

  loading = toSignal(
    this.store.select(AuthSelector.loading()),
    {initialValue: false}
  )

  form = inject(FormBuilder).group({
    email: [`glrd.remi+${Math.random().toFixed(3)}@gmail.com`, [Validators.required]],
    password: ['glrd', [Validators.required]],
    username: [`glrd+${Math.random().toFixed(3)}`, [Validators.required]],
  })


  submit() {
    if (this.form.invalid) return

    this.store.dispatch(new RegisterSubmitted({...this.form.value} as RegisterUser))

    this.router.navigate(['..', 'login'], {relativeTo: this.route})
  }
}
