import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageData} from '../../entity/MessageData';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {Department} from '../../entity/Department';

@Component({
  selector: 'app-employee-save',
  templateUrl: './employee-save.component.html',
  styleUrls: ['./employee-save.component.css']
})
export class EmployeeSaveComponent implements OnInit {
  readonly UPDATE = MessageConstant.UPDATE;
  readonly NEW = MessageConstant.NEW;
  readonly VIEW = MessageConstant.VIEW;
  readonly ERROR = MessageConstant.ERROR;
  readonly SUCCESS = MessageConstant.SUCCESS;
  @Input() mode = MessageConstant.VIEW;
  @Input() employee: Employee = new Employee();
  @Output() backToList: EventEmitter<MessageData> = new EventEmitter();
  showMessageKey = MessageConstant.NONE;

  departmentList: Department[] = [];
  managerList: Employee[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  onClickBack() {
    const data = new MessageData();
    data.title = '';
    data.message = '';
    data.showMessage = false;
    data.type = MessageConstant.ALERT_SUCCESS;
    this.backToList.emit(data);
  }

  onSubmit() {

  }

  onSelectDepartment() {

  }
}
