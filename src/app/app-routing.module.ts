import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ManagementComponent} from './admin/management/management.component';
import {AccountManagementComponent} from './admin/account-management/account-management.component';
import {EmployeeManagementComponent} from './admin/employee-management/employee-management.component';
import {AccountSaveComponent} from './admin/account-save/account-save.component';
import {LoginComponent} from './login/login.component';
import {RouteConstant} from './constant/RouteConstant';
import {AuthGuard} from './service/auth/auth-guard.service';
import {KhoiManagementComponent} from './admin/khoi-management/khoi-management.component';
import {LeaderGuard} from './service/auth/leader-guard.service';

const routes: Routes = [
  {path: RouteConstant.NONE, redirectTo: RouteConstant.HOME, pathMatch: 'full'},
  {path: RouteConstant.HOME, component: HomeComponent},
  {path: RouteConstant.LOGIN, component: LoginComponent},
  {
    path: RouteConstant.MANAGEMENT,
    component: ManagementComponent,
    canActivate: [LeaderGuard],
    children: [
      {
        path: RouteConstant.ACCOUNTS,
        canActivateChild: [LeaderGuard],
        component: AccountManagementComponent
      },
      {
        path: RouteConstant.SAVE_ACCOUNT,
        canActivateChild: [LeaderGuard],
        component: AccountSaveComponent
      },
      {
        path: RouteConstant.EMPLOYEES,
        canActivateChild: [LeaderGuard],
        component: EmployeeManagementComponent
      },
      {
        path: RouteConstant.KHOI,
        canActivateChild: [LeaderGuard],
        component: KhoiManagementComponent
      }
    ]
  },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
