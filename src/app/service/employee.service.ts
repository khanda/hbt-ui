import {HttpClient} from '@angular/common/http';
import {Employee} from '../entity/Employee';
import {Observable} from 'rxjs/Observable';
import {PagingData} from '../entity/PagingData';
import {ApiUrlConstant} from '../constant/ApiUrlConstant';
import {MyHttpUtil} from '../util/MyHttpUtil';
import {catchError, tap} from 'rxjs/operators';
import {Department} from '../entity/Department';
import {Injectable} from '@angular/core';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getListEmployee(page: number, pageSize: number): Observable<PagingData<Employee>> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.EMPLOYEE_GET_LIST_URL;
    return this.http.post<PagingData<Employee>>(url, {'page': page, 'pageSize': pageSize})
      .pipe(
        tap(_ => console.log()
        ),
        catchError(MyHttpUtil.handleError<PagingData<Employee>>('getListEmployee'))
      );
  }

  getListDepartment(): Observable<Department[]> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.DEPARTMENT_GET_LIST_URL;
    return this.http.post<Department[]>(url, null)
      .pipe(
        tap(_ => console.log(_)
        ),
        catchError(MyHttpUtil.handleError<Department[]>('getListDepartment'))
      );
  }
  saveEmployee(employee: Employee): Observable<boolean> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.EMPLOYEE_SAVE_URL;
    console.log(employee);
    return this.http.post<boolean>(url, employee)
      .pipe(
        tap(_ => console.log(_)
        ),
        catchError(MyHttpUtil.handleError<boolean>('saveEmployee'))
      );
  }
}
