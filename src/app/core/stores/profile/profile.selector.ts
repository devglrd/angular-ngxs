import {createPropertySelectors, createSelector} from "@ngxs/store";
import {ProfileState, ProfileStateModel} from "./profile.state";
import {SummaryArticle} from "@models/article.model";
import {articleToSummaryArticle} from "../../helpers/article.helpers";

export class ProfileSelector{
  static slices = createPropertySelectors<ProfileStateModel>(ProfileState)

  static profile(){
    return createSelector(
      [ProfileSelector.slices.profile],
      (profile) => profile
    )
  }

  static articles(){
    return createSelector(
      [ProfileSelector.slices.articles],
      (articles) => (articleToSummaryArticle(articles))
    )
  }
}
