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

const routes: Routes = [
  {path: RouteConstant.NONE, redirectTo: RouteConstant.HOME, pathMatch: 'full'},
  {path: RouteConstant.HOME, component: HomeComponent},
  {path: RouteConstant.LOGIN, component: LoginComponent},
  {
    path: RouteConstant.MANAGEMENT,
    component: ManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: RouteConstant.ACCOUNTS,
        canActivateChild: [AuthGuard],
        component: AccountManagementComponent
      },
      {
        path: RouteConstant.SAVE_ACCOUNT,
        canActivateChild: [AuthGuard],
        component: AccountSaveComponent
      },
      {
        path: RouteConstant.EMPLOYEES,
        canActivateChild: [AuthGuard],
        component: EmployeeManagementComponent
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
