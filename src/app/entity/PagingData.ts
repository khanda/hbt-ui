export class PagingData<T> {
  private _page: number;
  private _pageSize: number;
  private _total: number;
  private _totalPage?: number;
  private _data: T[];


  constructor() {
    this._page = 1;
    this._pageSize = 10;
    this._total = 0;
    this._totalPage = 0;
    this._data = [];
  }


  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get totalPage(): number {
    return this._totalPage;
  }

  set totalPage(value: number) {
    this._totalPage = value;
  }

  get data(): T[] {
    return this._data;
  }

  set data(value: T[]) {
    this._data = value;
  }
}
