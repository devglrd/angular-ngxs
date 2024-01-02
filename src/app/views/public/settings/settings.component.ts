import {Component, inject} from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {Store} from "@ngxs/store";
import {AuthSelector} from "../../../core/stores/auth/auth.selector";
import {UpdateUserPayload, User} from "@models/user.model";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Logout, UpdateUser} from "../../../core/stores/auth/auth.actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export default class SettingsComponent {
  store = inject(Store)
  router = inject(Router)
  user = toSignal(
    this.store.select(AuthSelector.user()),
    {
      initialValue: {} as User
    }
  )
  fb = inject(FormBuilder)
  form = this.fb.group({
    username: this.fb.control({value: this.user()?.username, disabled: false}, [Validators.required]),
    bio: this.fb.control({value: this.user()?.bio, disabled: false}, [Validators.required]),
    image: this.fb.control({value: this.user()?.image, disabled: false}, [Validators.required]),
    email: this.fb.control({value: this.user()?.email, disabled: false}, [Validators.required]),
    password: this.fb.control({value: '', disabled: false}, []),

  })


  logout() {
    this.store.dispatch(new Logout())
    this.router.navigateByUrl('/')
  }

  update() {
    if (this.form.invalid) return;

    this.store.dispatch(new UpdateUser({...this.form.value} as UpdateUserPayload))
  }
}
