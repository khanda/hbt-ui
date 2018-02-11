import {Injectable} from '@angular/core';
import {MessageConstant} from '../../constant/MessageConstant';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class MyAlertService {
  public options = {
    position: [MessageConstant.VERTICAL_POSITION, MessageConstant.HORIZONTAL_POSITION],
    timeOut: MessageConstant.TIMEOUT,
    lastOnBottom: true
  };

  constructor(private _notificationsService: NotificationsService) {
  }

  showAlertMessage(content: string, type: string, title: string) {
    this._notificationsService.create(
      title, content, type, this.options
    );
  }

}
