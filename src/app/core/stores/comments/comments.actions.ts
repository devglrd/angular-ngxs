import {ArticleComment} from "@models/article.model";

export class GetComments {
  static readonly type = '[Comment] Get Comments';

  constructor(public slug: string) {
  }
}
export class CommentsGet {
  static readonly type = '[Comment] Comments get';

  constructor(public comments: ArticleComment[]) {
  }
}


export class AddComment{
  static readonly type = '[Comment] Add Comment';

  constructor(public payload: {slug:string, data:string}) {
  }
}

export class DeleteComment{
  static readonly type = '[Comment] Delete Comment';

  constructor(public payload: { slug:string, id:string }) {
  }
}
