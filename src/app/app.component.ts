import {Component, TemplateRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MyConstant} from './constant/MyConstant';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {MessageConstant} from './constant/MessageConstant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  language: string;

  constructor(private translate: TranslateService) {
    this.language = MyConstant.DEFAULT_LANGUAGE;
    translate.setDefaultLang(this.language);
  }

  switchLanguage(language: string) {
    this.language = language;
    this.translate.use(this.language);
  }


}
