import {Component, inject} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthSelector} from "../../../core/stores/auth/auth.selector";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginSubmitted, RegisterSubmitted} from "../../../core/stores/auth/auth.actions";
import {LoginUser, RegisterUser} from "@models/user.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default  class LoginComponent {
  store = inject(Store);


  router = inject(Router);
  route = inject(ActivatedRoute);

  loading = toSignal(
    this.store.select(AuthSelector.loading()),
    {initialValue: false}
  )

  form = inject(FormBuilder).group({
    email: [`glrd.remi@gmail.com`, [Validators.required]],
    password: ['glrd', [Validators.required]],
  })

  errors = toSignal(
    this.store.select(AuthSelector.errors()),
    {initialValue: {}}
  )


  constructor() {
    this.store.select((state) => state.auth.isAuth).subscribe((auth)=> {
      console.log(auth);
      if(auth){
        this.router.navigate(['..'], {relativeTo: this.route})
      }
    })
  }

  submit() {
    if (this.form.invalid) return

    this.store.dispatch(new LoginSubmitted({...this.form.value} as LoginUser))
  }
}
