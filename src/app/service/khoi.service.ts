import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Khoi} from '../entity/Khoi';
import {ApiUrlConstant} from '../constant/ApiUrlConstant';
import {catchError} from 'rxjs/operators';
import {MyHttpUtil} from '../util/MyHttpUtil';

@Injectable()
export class KhoiService {

  constructor(private http: HttpClient) {
  }

  getListKhoi(): Observable<Khoi[]> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.KHOI_GET_LIST_URL;
    return this.http.post<Khoi[]>(url, null)
      .pipe(
        catchError(MyHttpUtil.handleError<Khoi[]>('getListEmployee'))
      );
  }
  saveKhoi(khoi: Khoi): Observable<Khoi> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.KHOI_SAVE_URL;
    return this.http.post<Khoi>(url, khoi)
      .pipe(
        catchError(MyHttpUtil.handleError<Khoi>('saveKhoi'))
      );
  }
}
