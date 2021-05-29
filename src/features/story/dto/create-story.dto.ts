export class CreateStoryDto {
  constructor(
    private _title: string,
    private _url: string,
    private _author: string,
    private _createdAt: Date,
  ) {}

  public get title() {
    return this._title;
  }
  public set title(title: string) {
    this._title = title;
  }
  public get url() {
    return this._url;
  }
  public set url(url: string) {
    this._url = url;
  }
  public get author() {
    return this._author;
  }
  public set author(author: string) {
    this._author = author;
  }
  public get createdAt() {
    return this._createdAt;
  }
  public set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }
}
