import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageData} from '../../entity/MessageData';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {Department} from '../../entity/Department';
import {LengthContant} from '../../constant/LengthContant';
import {EmployeeService} from '../../service/employee.service';
import {MyTranslate} from '../../service/my-translate.service';
import {ConfirmationService} from "@jaspero/ng2-confirmations";

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

  constructor(private  employeeService: EmployeeService,
              private _confirmation: ConfirmationService,
              private translate: MyTranslate) {
  }

  ngOnInit() {
    this.getDepartments();
  }

  onSubmit() {
    console.log(this.employee);
    if (this.employee.isLeader) {
      this.employee.isLeader = 1;
    }
    this.employeeService.saveEmployee(this.employee).subscribe(isSuccess => {
      if (isSuccess) {
        const data = new MessageData();
        data.title = this.translate.translateString('message.title.success');
        data.message = this.translate.translateString('message.save.content.success');
        data.showMessage = true;
        data.type = MessageConstant.ALERT_SUCCESS;
        this.backToList.emit(data);
      } else {
        this.showMessageKey = this.ERROR;
      }
    });
  }

  onSelectDepartment() {

  }

  onClickBack() {
    const data = new MessageData();
    data.title = '';
    data.message = '';
    data.showMessage = false;
    data.type = MessageConstant.ALERT_SUCCESS;
    this.backToList.emit(data);
  }

  getDepartments() {
    this.employeeService.getListDepartment().subscribe(departments => this.departmentList = departments);
  }
}
