import {MessageConstant} from '../constant/MessageConstant';
import {NotificationsService} from 'angular2-notifications';
export class NotificationUtil {
  private static options = {
    position: [MessageConstant.VERTICAL_POSITION, MessageConstant.HORIZONTAL_POSITION],
    timeOut: MessageConstant.TIMEOUT,
    lastOnBottom: true
  };

  public static showAlertMessage(service: NotificationsService, content: string, type: string, title?: string) {
    service.create(
      title, content, type, this.options
    );
  }
}
