import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {AccountManagementComponent} from './admin/account-management/account-management.component';
import {ManagementComponent} from './admin/management/management.component';
import {EmployeeManagementComponent} from './admin/employee-management/employee-management.component';
import {AccountService} from './service/account.service';
import {PaginationComponent} from './pagination/pagination.component';
import {ButtonNewComponent} from './buttons/button-new/button-new.component';
import {AccountSaveComponent} from './admin/account-save/account-save.component';
import {ForbiddenValidatorDirective} from './directive/regExp-validator.directive';
import {ActionTableButtonComponent} from './action-table-button/action-table-button.component';
import {MyNavBarComponent} from './my-nav-bar/my-nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {JasperoConfirmationsModule} from '@jaspero/ng2-confirmations';
import {BsDropdownModule, PaginationModule} from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {MyFooterComponent} from './my-footer/my-footer.component';
import {LoginComponent} from './login/login.component';
import {LoginService} from './service/login.service';
import {AuthGuard} from './service/auth/auth-guard.service';
import {AuthService} from './service/auth/auth.service';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {MyTranslate} from './service/my-translate.service';
import {NgProgressModule} from '@ngx-progressbar/core';
import {EmployeeService} from './service/employee.service';
import { EmployeeSaveComponent } from './admin/employee-save/employee-save.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountManagementComponent,
    ManagementComponent,
    EmployeeManagementComponent,
    PaginationComponent,
    ButtonNewComponent,
    AccountSaveComponent,
    ForbiddenValidatorDirective,
    ActionTableButtonComponent,
    MyNavBarComponent,
    MyFooterComponent,
    LoginComponent,
    EmployeeSaveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    JasperoConfirmationsModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AccountService,
    EmployeeService,
    LoginService,
    AuthGuard,
    MyTranslate,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
