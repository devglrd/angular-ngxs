import {createPropertySelectors, createSelector} from "@ngxs/store";
import {TagsState, TagsStateModel} from "./tags.state";

export class TagsSelector {

  static slices = createPropertySelectors<TagsStateModel>(TagsState)

  static tags() {
    return createSelector(
      [TagsSelector.slices.tags],
      (tags) => tags
    )
  }
}
