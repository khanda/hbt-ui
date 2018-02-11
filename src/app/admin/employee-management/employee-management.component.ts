import {Component, OnInit} from '@angular/core';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {PagingData} from '../../entity/PagingData';
import {EmployeeService} from '../../service/employee.service';
import {MessageData} from '../../entity/MessageData';
import {MyAlertService} from '../../service/alert/my-alert.service';
import {BreadcrumbData} from '../../entity/BreadcrumbData';

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
    console.log(index);
    this.selectedEmployee = this.pagingData.data[index];
    console.log(this.selectedEmployee);
    this.changeBreadcrumb(this.mode);
  }

  onClickUpdate(index: number) {
    this.mode = MessageConstant.UPDATE;
    this.selectedEmployee = this.pagingData.data[index];
    this.changeBreadcrumb(this.mode);
  }

  onClickDelete(index: number) {

  }

  pageChanged(event: any): void {
    this.pagingData.page = event.page;
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
  }

  getListEmployee(page: number, pageSize: number) {
    this.employeeService.getListEmployee(page, pageSize)
      .subscribe(pagingData => {
        this.pagingData = pagingData;
        console.log(this.pagingData);
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
}
