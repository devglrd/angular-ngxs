import {Component, inject} from '@angular/core';
import {Actions, ofAction, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NewArticlePayload} from "@models/article.model";
import {
  ArticleCreated,
  ArticleDeleted,
  NewArticle,
  UpdateArticle
} from "../../../core/stores/articles/articles.actions";
import {ArticlesGateway} from "../../../core/ports/articles.gateway";
import {tap} from "rxjs";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export default class EditorComponent {
  store = inject(Store)
  router = inject(Router)
  route = inject(ActivatedRoute)
  fb = inject(FormBuilder)
  slug: string | null;
  articleGateway = inject(ArticlesGateway)
  actions = inject(Actions)
  form = this.fb.group({
    title: this.fb.control<string>({value: '', disabled: false}, [Validators.required]),
    description: this.fb.control<string>({value: '', disabled: false}, [Validators.required]),
    body: this.fb.control<string>({value: '', disabled: false}, [Validators.required]),
    tags: this.fb.control<string[]>({value: [], disabled: false}, [Validators.required]),
    tagsInput: this.fb.control<string>('')
  })

  constructor() {
    this.actions.pipe(
      ofAction(
        ArticleCreated
      )
    ).subscribe(({slug}: ArticleCreated) => {

      this.router.navigateByUrl(`/article/${slug}`)
    })

    this.route.paramMap.subscribe(
      (params) => {
        this.slug = params.get('slug');
        if (!!this.slug) {
          this.articleGateway.retrieveArticle(this.slug).subscribe(
            (article) => this.form.patchValue({
              title: article.title,
              description: article.description,
              body: article.body,
              tags: article.tagList
            })
          )
        }
      }
    )
  }

  submit() {
    if (this.form.invalid) return

    const data = {
      title: this.form.value.title as string,
      description: this.form.value.description as string,
      body: this.form.value.body as string,
      tagList: this.form.value.tags as string[],
    } as NewArticlePayload;

    !this.slug ? this.store.dispatch(new NewArticle(data)) : this.store.dispatch(new UpdateArticle(this.slug!, data))
  }

  addTags(event: any) {
    const tags = this.form.value.tags as string[];
    const newtags = this.form.value.tagsInput as string;
    // const tags: string[] = [...this.form.value.tags, this.form.value.tagsInput]
    this.form.patchValue({
      tags: [...tags, newtags],
      tagsInput: ''
    })
  }

  removeTag(tag: string) {
    const tags = this.form.value.tags as string[];
    this.form.patchValue({
      tags: tags.filter((t) => t !== tag)
    });
  }

}
