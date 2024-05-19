import {inject, Injectable} from '@angular/core';
import {State, Action, StateContext} from '@ngxs/store';
import {RetrieveTags, TagsRetrieved} from './tags.actions';
import {tap} from "rxjs";
import {TagsGateway} from "../../ports/tags.gateway";

export class TagsStateModel {
  public tags: string[];
}

const defaults = {
  tags: []
};

@State<TagsStateModel>({
  name: 'tags',
  defaults
})
@Injectable()
export class TagsState {
  articleGateway = inject(TagsGateway)

  @Action(RetrieveTags)
  RetrieveTags({dispatch}: StateContext<TagsStateModel>) {
    return this.articleGateway.retrieveTags().pipe(
      tap(
        (tags) => dispatch(new TagsRetrieved(tags))
      )
    )
  }

  @Action(TagsRetrieved)
  TagsRetrieved({patchState}: StateContext<TagsStateModel>, {tags}: TagsRetrieved) {
    patchState({
      tags
    })
  }
}
