import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {Employee} from '../../entity/Employee';
import {PagingData} from '../../entity/PagingData';
import {EmployeeService} from '../../service/employee.service';
import {NgProgress} from '@ngx-progressbar/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Khoi} from '../../entity/Khoi';
import {MyTranslate} from '../../service/my-translate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ValidationUtil} from '../../util/ValidationUtil';
import {RegexConstant} from '../../constant/RegexConstant';
import {Subject} from "rxjs/Subject";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";


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

  inValidSearchString = false;
  private searchTerms = new Subject<string>();

  constructor(private employeeService: EmployeeService,
              public progress: NgProgress,
              private myTranslate: MyTranslate,
              public dialogRef: MatDialogRef<EmployeeSearchComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.khoi = data.khoi;
  }

  ngOnInit() {
    // this.getListEmployee(this.pagingData.page, this.pagingData.pageSize, '');
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.progress.start();
        return this.employeeService.getListEmployee(this.pagingData.page, this.pagingData.pageSize, term);
      }),
    ).subscribe(pagingData => {
      if (pagingData) {
        this.pagingData = pagingData;
        this.dataSource = new MatTableDataSource(this.pagingData.data);
      }
      this.progress.complete();
    });

    this.search('');
  }

  ngAfterViewInit() {
  }

// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  applyFilter(filterValue: string) {
    this.pagingData.page = 1;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (!ValidationUtil.isMatchRegex(RegexConstant.searchRegex, filterValue)) {
      this.inValidSearchString = true;
      this.pagingData.data = [];
      this.dataSource = new MatTableDataSource(this.pagingData.data);
      return;
    }
    console.log('applyFilter');
    this.inValidSearchString = false;
    this.search(filterValue);
    // this.getListEmployee(this.pagingData.page, this.pagingData.pageSize, filterValue);
  }

  pageChanged(event: any): void {
    this.clearSelected();
    this.pagingData.page = event.page;
    // this.search('');
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
