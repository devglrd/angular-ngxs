import {Component, computed, inject, Input, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";

import {Store} from "@ngxs/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthSelector} from "../../../../../core/stores/auth/auth.selector";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentsSelector} from "../../../../../core/stores/comments/comments.selector";
import {AddComment, DeleteComment, GetComments} from "../../../../../core/stores/comments/comments.actions";
import {InnerHTMLPipe} from "../../../../../shared/pipes/inner-html.pipe";

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    InnerHTMLPipe
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{
  @Input({required: true}) slug: string;
  store = inject(Store)

  comments = toSignal(
    this.store.select(CommentsSelector.comments()),
    {initialValue: []}
  )

  loading = toSignal(
    this.store.select(CommentsSelector.loadingComments()),
    {initialValue: false}
  )

  user = toSignal(
    this.store.select(AuthSelector.user()),
    {initialValue: null}
  )
  inputCommentaire ='';



  constructor() {



  }

  ngOnInit() {
    console.log(this.slug);

    this.store.dispatch(new GetComments(this.slug))
  }

  submit() {
    if (!this.inputCommentaire) return;

    this.store.dispatch(new AddComment({slug: this.slug,data: this.inputCommentaire}))
    this.inputCommentaire = '';
  }

  delete(id:string) {
    this.store.dispatch(new DeleteComment({slug: this.slug, id}))
  }
}
