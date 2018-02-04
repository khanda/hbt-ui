import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MyTranslate {

  constructor(private translate: TranslateService) {
  }

  translateString(string: string): string {
    let text = '';
    this.translate.get(string).subscribe((value: string) => text = value);
    return text;
  }
}
