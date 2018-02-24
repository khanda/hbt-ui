import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {Employee} from '../../entity/Employee';
import {PagingData} from '../../entity/PagingData';
import {EmployeeService} from '../../service/employee.service';
import {NgProgress} from '@ngx-progressbar/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Khoi} from '../../entity/Khoi';
import {MyTranslate} from '../../service/my-translate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit, AfterViewInit {
  selectedEmployee: Employee = new Employee();
  pagingData = new PagingData<Employee>();
  selectedIndex = -1;
  khoi: Khoi = new Khoi;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource([]);
  displayedColumns = ['select', 'lastName', 'midName', 'firstName', 'department.name'];
  selection = new SelectionModel<Employee>(false, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private employeeService: EmployeeService,
              public progress: NgProgress,
              private myTranslate: MyTranslate,
              public dialogRef: MatDialogRef<EmployeeSearchComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.khoi = data.khoi;
  }

  ngOnInit() {
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize, '');
  }

  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
    filterValue = this.buildSearchTerm(filterValue);
    console.log(filterValue);
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize, filterValue);
  }

  pageChanged(event: any): void {
    this.clearSelected();
    this.pagingData.page = event.page;
    this.getListEmployee(this.pagingData.page, this.pagingData.pageSize, '');
  }

  getListEmployee(page: number, pageSize: number, searchTerm: string) {
    this.progress.start();
    this.employeeService.getListEmployee(page, pageSize, searchTerm)
      .subscribe(pagingData => {
        if (pagingData) {
          this.pagingData = pagingData;
          this.dataSource = new MatTableDataSource(this.pagingData.data);
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

  onChangeSelect(event) {
    this.selectedEmployee = this.selection.selected[0];
  }

  private buildSearchTerm(filterValue: string) {
    let query = '';
    const properties = ['firstName', 'midName', 'lastName'];
    query = properties.join(':' + filterValue + ',');
    query += (':' + filterValue);
    return query;
  }
}
