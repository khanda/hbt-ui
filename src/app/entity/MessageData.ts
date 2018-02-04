export class MessageData {
  private _title: string;
  private _message: string;
  private _showMessage: boolean;
  private _type: string;

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get showMessage(): boolean {
    return this._showMessage;
  }

  set showMessage(value: boolean) {
    this._showMessage = value;
  }
}
