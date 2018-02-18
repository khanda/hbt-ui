import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MyConstant} from './constant/MyConstant';
import {MyAlertService} from './service/alert/my-alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  language: string;
  public options = {};

  constructor(private translate: TranslateService,
              private  alertService: MyAlertService) {
    this.language = MyConstant.DEFAULT_LANGUAGE;
    translate.setDefaultLang(this.language);
    localStorage.setItem(MyConstant.LANGUAGE, this.language);
    this.options = this.alertService.options;
  }

  switchLanguage(language: string) {
    this.language = language;
    this.translate.use(this.language);
    localStorage.setItem(MyConstant.LANGUAGE, this.language);
  }
}
