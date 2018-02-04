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

  getListAccount(token: string, page: number, itemPerPage: number): Observable<PagingData<Account>> | any {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_GET_LIST_URL;
    return this.http.post<PagingData<Account>>(url, {'page': page, 'itemPerPage': itemPerPage})
      .pipe(
        tap(_ => console.log('found accounts')
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
