import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageData} from '../../entity/MessageData';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {Department} from '../../entity/Department';
import {LengthContant} from '../../constant/LengthContant';
import {EmployeeService} from "../../service/employee.service";

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
  readonly NAME_MIN = LengthContant.NAME_MIN_LENGTH;
  readonly NAME_MAX = LengthContant.NAME_MAX_LENGTH;
  readonly NAME_REG = LengthContant.VN_NAME_REG;
  @Input() mode = MessageConstant.VIEW;
  @Input() employee: Employee = new Employee();
  @Output() backToList: EventEmitter<MessageData> = new EventEmitter();
  showMessageKey = MessageConstant.NONE;

  departmentList: Department[] = [];
  managerList: Employee[] = [];

  constructor(private  employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getDepartments();
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

  getDepartments() {
    this.employeeService.getListDepartment().subscribe(departments => this.departmentList = departments);
  }
}
