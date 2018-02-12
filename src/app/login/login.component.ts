import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import {RouteConstant} from '../constant/RouteConstant';
import {CredentialConstant} from '../constant/CredentialConstant';
import {AuthService} from '../service/auth/auth.service';
import {CredentialData} from '../entity/CredentialData';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginName: string;
  password: string;
  submitted = false;
  // message
  showLoginError = false;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              public progress: NgProgress,
              private router: Router) {
  }

  ngOnInit() {
    this.checkIfLoginAlready();
  }


  onclickSubmit() {
    this.submitted = true;
    // send data to api to login
    this.startLoading();
    this.loginService.login(this.loginName, this.password).subscribe(credentialData => {
      if (credentialData !== null && credentialData.token && credentialData.token.length) {
        console.log(credentialData);
        this.authService.saveCredentialData(credentialData);
        this.router.navigate([RouteConstant.HOME]);
      } else {
        this.showLoginError = true;
      }

      this.completeLoading();
    });
  }

  private checkIfLoginAlready() {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate([RouteConstant.HOME]);
    }
  }



  startLoading() {
    this.progress.start();
  }

  completeLoading() {
    this.progress.complete();
  }
}
