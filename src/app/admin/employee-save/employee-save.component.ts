import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageData} from '../../entity/MessageData';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {Department} from '../../entity/Department';
import {LengthConstant} from '../../constant/LengthContant';
import {EmployeeService} from '../../service/employee.service';
import {MyTranslate} from '../../service/my-translate.service';
import {ConfirmationService} from '@jaspero/ng2-confirmations';
import {CredentialData} from '../../entity/CredentialData';
import {AuthService} from '../../service/auth/auth.service';
import {NgProgress} from '@ngx-progressbar/core';

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
  readonly NAME_MIN = LengthConstant.NAME_MIN_LENGTH;
  readonly NAME_MAX = LengthConstant.NAME_MAX_LENGTH;
  readonly NAME_REG = LengthConstant.VN_NAME_REG;
  @Input() mode = MessageConstant.VIEW;
  @Input() employee: Employee = new Employee();
  @Output() backToList: EventEmitter<MessageData> = new EventEmitter();
  showMessageKey = MessageConstant.NONE;

  departmentList: Department[] = [];
  managerList: Employee[] = [];
  credentialData: CredentialData;

  constructor(private  employeeService: EmployeeService,
              private _confirmation: ConfirmationService,
              private authService: AuthService,
              public progress: NgProgress,
              private translate: MyTranslate) {
  }

  ngOnInit() {
    this.getDepartments();
    if (this.mode === this.UPDATE || this.mode === this.VIEW) {
      this.getManagers(this.employee.departmentId);
    }
    this.credentialData = this.authService.getCredentialData();
  }

  onSubmit() {
    this.progress.start();
    this.employee.isLeader = this.employee.isLeader ? 1 : 0;
    this.employee.createBy = this.credentialData.userName;
    this.employee.updateBy = this.credentialData.userName;
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
      this.progress.complete();
    });
  }

  onSelectDepartment(index) {
    this.getManagers(index);
  }

  onSelectManager(index) {
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
    this.progress.start();
    this.employeeService.getListDepartment().subscribe(departments => {
      this.departmentList = departments;
      this.progress.complete();
    });
  }

  getManagers(departmentId: number) {
    this.progress.start();
    this.employeeService.getListManagers(departmentId).subscribe(managers => {
      this.managerList = managers ? managers : [];
      this.progress.complete();
    });
  }
}
