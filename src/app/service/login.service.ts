import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiUrlConstant} from '../constant/ApiUrlConstant';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {MyHttpUtil} from '../util/MyHttpUtil';
import {CredentialData} from '../entity/CredentialData';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<CredentialData> {
    const url = ApiUrlConstant.BASE_URL_WITHOUT_API + ApiUrlConstant.LOGIN_URL;
    return this.http.post<CredentialData>(url, {'email': email, 'password': password})
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(MyHttpUtil.handleError<CredentialData>('login', new CredentialData()))
      );
  }
}
