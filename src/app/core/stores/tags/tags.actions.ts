export class RetrieveTags {
  static readonly type = '[Tags] Retrieve all tags';
  constructor() { }
}

export class TagsRetrieved {
  static readonly type = '[Tags] TagsRetrieved';
  constructor(public tags : string[]) { }
}
