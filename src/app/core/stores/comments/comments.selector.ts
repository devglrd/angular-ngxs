import {createPropertySelectors, createSelector} from "@ngxs/store";
import {CommentsState, CommentsStateModel} from "./comments.state";

export class CommentsSelector {

  static slices = createPropertySelectors<CommentsStateModel>(CommentsState)


  static comments() {
    return createSelector(
      [CommentsSelector.slices.comments],
      (comments) => comments
    )
  }

  static loadingComments() {
    return createSelector(
      [CommentsSelector.slices.loadingComments],
      (loading) => loading
    )
  }
}
