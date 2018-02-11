import {Component, OnInit} from '@angular/core';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {PagingData} from '../../entity/PagingData';
import {EmployeeService} from '../../service/employee.service';
import {MessageData} from '../../entity/MessageData';
import {MyAlertService} from '../../service/alert/my-alert.service';
import {BreadcrumbData} from '../../entity/BreadcrumbData';
import {ResolveEmit} from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';
import {ConfirmationService} from '@jaspero/ng2-confirmations';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  // listEmployee: Employee[] = [];
  selectedEmployee: Employee = new Employee();
  LIST = MessageConstant.LIST;
  mode = this.LIST;

  pagingData = new PagingData<Employee>();
  breadcrumb: BreadcrumbData[] = [];

  constructor(private employeeService: EmployeeService,
              private _confirmation: ConfirmationService,
              public snackBar: MatSnackBar,
              private  alertService: MyAlertService) {
  }

  ngOnInit() {
    this.initBreadcrumb();
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
  }

  onClickAdd() {
    this.mode = MessageConstant.NEW;
    this.selectedEmployee = new Employee();
    this.changeBreadcrumb(this.mode);
  }


  onClickView(index: number) {
    this.mode = MessageConstant.VIEW;
    this.selectedEmployee = this.pagingData.data[index];
    this.changeBreadcrumb(this.mode);

    console.log(this.selectedEmployee);
  }

  onClickUpdate(index: number) {
    this.mode = MessageConstant.UPDATE;
    this.selectedEmployee = this.pagingData.data[index];
    this.changeBreadcrumb(this.mode);
  }

  onClickDelete(index: number) {
    this._confirmation.create('Chú ý', 'Bạn có chắc chắn muốn xóa ?')
    // The confirmation returns an Observable Subject which will notify you about the outcome
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.employeeService.deleteEmployee(this.pagingData.data[index]).subscribe(result => {
            if (result) {
              this.alertService.showAlertMessage('Xóa tài khoản thành công', MessageConstant.ALERT_SUCCESS, 'Thành công');
              this.pagingData.page = 1;
              this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
            } else {
              this.alertService.showAlertMessage('Xóa tài khoản không thành công',
                MessageConstant.ALERT_DANGER, 'Lỗi');
            }
          });
        }
      });
  }

  pageChanged(event: any): void {
    this.pagingData.page = event.page;
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
  }

  getListEmployee(page: number, pageSize: number) {
    this.employeeService.getListEmployee(page, pageSize)
      .subscribe(pagingData => {
        this.pagingData = pagingData;
      });
  }


  backFromSaveForm(data: MessageData) {
    this.mode = this.LIST;
    // this.listEmployee = [];
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
    if (data && data.showMessage) {
      this.alertService.showAlertMessage(data.message, data.type, data.title);
    }
  }

  initBreadcrumb() {
    this.breadcrumb.push(new BreadcrumbData('management.employee.caption', ''));
  }

  changeBreadcrumb(mode: number) {
    this.breadcrumb.splice(-1, 1);
    console.log(this.breadcrumb);
    if (MessageConstant.LIST === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.employee.caption', ''));
    } else if (MessageConstant.NEW === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.employee.new', ''));
    } else if (MessageConstant.UPDATE === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.employee.update', ''));
    } else if (MessageConstant.VIEW === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.employee.view', ''));
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
