import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MyConstant} from '../constant/MyConstant';

@Injectable()
export class MyTranslate {

  constructor(private translate: TranslateService) {
  }

  translateString(key: string): string {
    const language = localStorage.getItem(MyConstant.LANGUAGE);
    this.translate.use(language);
    let result = '';
    this.translate.get(key).subscribe((res: string) => {
      result = res;
    });
    return result;
  }

  translateParam(key: string, param: any): string {
    const language = localStorage.getItem(MyConstant.LANGUAGE);
    this.translate.use(language);
    let result = '';
    this.translate.get(key, param).subscribe((res: string) => {
      result = res;
    });
    return result;
  }
}
