import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteConstant} from '../constant/RouteConstant';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
import {CredentialConstant} from '../constant/CredentialConstant';

@Component({
  selector: 'app-my-nav-bar',
  templateUrl: './my-nav-bar.component.html',
  styleUrls: ['./my-nav-bar.component.css']
})
export class MyNavBarComponent implements OnInit {
  @Input() language;
  @Output() changeLanguage: EventEmitter<string> = new EventEmitter<string>();


  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onChangeLanguage(language: string) {
    this.changeLanguage.emit(language);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([RouteConstant.HOME]);
  }

  goToLoginPage() {
    this.router.navigate([RouteConstant.LOGIN]);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  showManagementMenuItem() {
    const credentialData = this.authService.getCredentialData();
    return CredentialConstant.HBT_TEAM_LEADER === credentialData.role || CredentialConstant.HBT_SUPER_ADMIN === credentialData.role;
  }

  getAccountDetail() {
    const credentialData = this.authService.getCredentialData();
    return credentialData.userName;
  }

  goToManagementPage() {
    this.router.navigate([RouteConstant.MANAGEMENT_ACCOUNTS]);
  }
}
