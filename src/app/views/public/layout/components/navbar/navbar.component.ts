import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Store} from "@ngxs/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthSelector} from "../../../../../core/stores/auth/auth.selector";
import {NgIf} from "@angular/common";
import {User} from "@models/user.model";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  store = inject(Store);
  isAuth = toSignal(
    this.store.select(AuthSelector.isAuth()), {
      initialValue: false
    }
  )
  user = toSignal(
    this.store.select(AuthSelector.user()),
    {initialValue: {} as User}
  )

}
