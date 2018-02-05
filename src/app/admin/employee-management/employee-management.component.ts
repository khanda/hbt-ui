import {Component, OnInit} from '@angular/core';
import {Employee} from '../../entity/Employee';
import {MessageConstant} from '../../constant/MessageConstant';
import {PagingData} from '../../entity/PagingData';

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

  pagingData = new PagingData();

  constructor() {
  }

  ngOnInit() {
    this.getListEmployee(this.currentPage, this.itemPerPage);
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
    this.getListEmployee(this.currentPage, this.itemPerPage);
  }

  getListEmployee(page: number, pageSize: number) {

  }
}
