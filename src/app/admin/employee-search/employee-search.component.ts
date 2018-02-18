import {Component, Inject, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {Employee} from '../../entity/Employee';
import {PagingData} from '../../entity/PagingData';
import {EmployeeService} from '../../service/employee.service';
import {NgProgress} from '@ngx-progressbar/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Khoi} from "../../entity/Khoi";

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  selectedEmployee: Employee = new Employee();
  pagingData = new PagingData<Employee>();
  selectedIndex = -1;
  khoi: Khoi = new Khoi;

  constructor(private employeeService: EmployeeService,
              public progress: NgProgress,
              public dialogRef: MatDialogRef<EmployeeSearchComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.khoi = data.khoi;
  }

  ngOnInit() {
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
  }

  pageChanged(event: any): void {
    this.clearSelected();
    this.pagingData.page = event.page;
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize);
  }

  getListEmployee(page: number, pageSize: number) {
    this.progress.start();
    this.employeeService.getListEmployee(page, pageSize)
      .subscribe(pagingData => {
        if (pagingData) {
          this.pagingData = pagingData;
        }
        this.progress.complete();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChoose(employee: Employee, index: number) {
    this.selectedIndex = index;
    this.selectedEmployee = employee;
  }

  clearSelected() {
    this.selectedIndex = -1;
    this.selectedEmployee = new Employee();
  }
}
