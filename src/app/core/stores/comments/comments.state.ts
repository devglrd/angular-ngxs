import {inject, Injectable} from '@angular/core';
import {State, Action, StateContext} from '@ngxs/store';
import {ArticleComment} from "@models/article.model";
import {tap} from "rxjs";
import {ArticlesGateway} from "../../ports/articles.gateway";
import {AddComment, CommentsGet, DeleteComment, GetComments} from "./comments.actions";
import {CommentsGateway} from "../../ports/comments.gateway";

export class CommentsStateModel {
  public comments: ArticleComment[];
  public loadingComments: boolean;
}

const defaults = {
  comments: [],
  loadingComments: false
};

@State<CommentsStateModel>({
  name: 'comment',
  defaults
})
@Injectable()
export class CommentsState {
  commentsGateway = inject(CommentsGateway)

  @Action(GetComments)
  getComments(
    ctx: StateContext<CommentsStateModel>,
    {slug}: GetComments
  ) {
    ctx.patchState({
      loadingComments: true
    })
    return this.commentsGateway.retrieveComments(slug).pipe(
      tap(
        comments => ctx.dispatch(new CommentsGet(comments))
      )
    )
  }

  @Action(CommentsGet)
  commentsGet(
    ctx: StateContext<CommentsStateModel>,
    {comments}: CommentsGet
  ) {
    ctx.patchState({
      comments,
      loadingComments: false
    })
  }

  @Action(AddComment)
  addComment(
    ctx: StateContext<CommentsStateModel>,
    {payload}: AddComment
  ) {
    return this.commentsGateway.addComment(payload.slug, payload.data).pipe(
      tap(
        (comment) => ctx.patchState({
          comments: [...ctx.getState().comments, comment]
        })
      )
    )
  }

  @Action(DeleteComment)
  DeleteComment(
    ctx: StateContext<CommentsStateModel>,
    {payload}: DeleteComment
  ) {
    return this.commentsGateway.deleteComment(payload.slug, payload.id).pipe(
      tap(
        (comment) => ctx.patchState({
          comments: ctx.getState().comments.filter((comment) => comment.id !== payload.id)
        })
      )
    )
  }
}
