import {Component, OnInit} from '@angular/core';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {PagingData} from '../../entity/PagingData';
import {EmployeeService} from '../../service/employee.service';
import {MessageData} from '../../entity/MessageData';
import {MyAlertService} from '../../service/alert/my-alert.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  listEmployee: Employee[] = [];
  selectedEmployee: Employee = new Employee();
  LIST = MessageConstant.LIST;
  mode = this.LIST;

  pagingData = new PagingData<Employee>();

  constructor(private employeeService: EmployeeService,
              private  alertService: MyAlertService) {
  }

  ngOnInit() {
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
  }

  onClickAdd() {
    this.mode = MessageConstant.NEW;
    this.selectedEmployee = new Employee();
  }


  onClickView(index: number) {
    this.mode = MessageConstant.VIEW;
    this.selectedEmployee = this.listEmployee[index];
  }

  onClickUpdate(index: number) {
    this.mode = MessageConstant.UPDATE;
    this.selectedEmployee = this.listEmployee[index];
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
    this.listEmployee = [];
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
    if (data && data.showMessage) {
      this.alertService.showAlertMessage(data.message, data.type, data.title);
    }
  }
}
