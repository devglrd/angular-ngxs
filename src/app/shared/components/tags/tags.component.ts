import {Component, inject} from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {Store} from "@ngxs/store";
import {TagsSelector} from "../../../core/stores/tags/tags.selector";
import {NgForOf} from "@angular/common";
import {RetrieveTags} from "../../../core/stores/tags/tags.actions";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  store = inject(Store);
  tags = toSignal(
    this.store.select(TagsSelector.tags()),
    {initialValue: []}
  )

  filterByTag(tag: any) {
    console.log(tag);
  }

  constructor() {
    this.store.dispatch(new RetrieveTags())
  }
}
