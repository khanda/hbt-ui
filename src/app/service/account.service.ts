import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Account} from '../entity/Account';
import {ApiUrlConstant} from '../constant/ApiUrlConstant';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PagingData} from '../entity/PagingData';
import {UserRole} from '../entity/UserRole';
import {MyHttpUtil} from '../util/MyHttpUtil';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getListAccount(page: number, pageSize: number): Observable<PagingData<Account>> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_GET_LIST_URL;
    return this.http.post<PagingData<Account>>(url, {'page': page, 'pageSize': pageSize})
      .pipe(
        tap(_ => console.log()
        ),
        catchError(MyHttpUtil.handleError<PagingData<Account>>('Get account'))
      );
  }


  getListRoles(): Observable<UserRole[]> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_ROLE_LIST_URL;

    return this.http.post<UserRole[]>(url, null)
      .pipe(
        tap(_ => console.log('found roles')
        ),
        catchError(MyHttpUtil.handleError<UserRole[]>('get role'))
      );
  }

  saveAccount(account: Account): Observable<boolean> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_SAVE_URL;

    return this.http.post<boolean>(url, account)
      .pipe(
        tap(() => console.log('found roles')
        ),
        catchError(MyHttpUtil.handleError<boolean>('save account'))
      );
  }

  deleteAccount(account: Account): Observable<boolean> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_DELETE_URL;

    return this.http.post<boolean>(url, account.id)
      .pipe(
        tap(() => console.log('delete account success')
        ),
        catchError(MyHttpUtil.handleError<boolean>('delete account'))
      );
  }
}
