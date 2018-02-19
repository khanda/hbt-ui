import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {MessageConstant} from '../../constant/MessageConstant';

@Component({
  selector: 'app-snack-message',
  templateUrl: './snack-message.component.html',
  styleUrls: ['./snack-message.component.css']
})
export class SnackMessageComponent implements OnInit {
  message: string;
  mode = MessageConstant.ALERT_INFO;
  SUCCESS = MessageConstant.ALERT_SUCCESS;
  ERROR = MessageConstant.ALERT_DANGER;
  WARNING = MessageConstant.ALERT_WARNING;
  INFO = MessageConstant.ALERT_INFO;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data) {
      this.message = data.message ? data.message : '';
      this.mode = data.mode ? data.mode : MessageConstant.ALERT_INFO;
      console.log(data);
    }
  }

  ngOnInit() {
  }

}
