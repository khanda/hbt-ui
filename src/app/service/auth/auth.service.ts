/**
 * Created by quyen on 03/02/2018.
 */
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {CredentialConstant} from '../../constant/CredentialConstant';
import {of} from 'rxjs/observable/of';
import {HttpRequest} from '@angular/common/http';
import {CredentialData} from '../../entity/CredentialData';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  cachedRequests: Array<HttpRequest<any>> = [];

  login(): Observable<boolean> {
    const token = localStorage.getItem(CredentialConstant.TOKEN);
    console.log(token);
    if (token && token.length) {
      this.isLoggedIn = true;
    }
    return of(this.isLoggedIn);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  public getToken(): string {
    return localStorage.getItem(CredentialConstant.TOKEN);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && token.length) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  public getCredentialData(): CredentialData {
    const credentialData = new CredentialData();
    credentialData.token = localStorage.getItem(CredentialConstant.TOKEN);
    credentialData.id = +localStorage.getItem(CredentialConstant.ID);
    credentialData.userName = localStorage.getItem(CredentialConstant.USERNAME);
    credentialData.role = localStorage.getItem(CredentialConstant.ROLE);
    return credentialData;
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
