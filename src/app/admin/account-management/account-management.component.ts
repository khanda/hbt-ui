import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {Account} from '../../entity/Account';
import {PagingData} from '../../entity/PagingData';
import {Router} from '@angular/router';
import {MessageConstant} from '../../constant/MessageConstant';
import {NotificationsService} from 'angular2-notifications';
import {MyConstant} from '../../constant/MyConstant';
import {ConfirmationService} from '@jaspero/ng2-confirmations';
import {ResolveEmit} from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';
import {MessageData} from '../../entity/MessageData';
import {TranslateService} from '@ngx-translate/core';
import {BreadcrumbData} from '../../entity/BreadcrumbData';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})

export class AccountManagementComponent implements OnInit {
// alert
  public options = {
    position: [MessageConstant.VERTICAL_POSITION, MessageConstant.HORIZONTAL_POSITION],
    timeOut: MessageConstant.TIMEOUT,
    lastOnBottom: true
  };

  // pagination
  currentPage = 1;
  itemPerPage = MyConstant.ITEM_PER_PAGE;
  total = 0;
  numPages = 0;
  pages: number[] = [];

  listAccount: Account[] = [];
  selectedAccount: Account = new Account();
  LIST = MessageConstant.LIST;
  mode = this.LIST;
  breadcrumb: BreadcrumbData[] = [];

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getListAccount(this.currentPage, this.itemPerPage);
  }

  constructor(private accountService: AccountService,
              private router: Router,
              private translate: TranslateService,
              public progress: NgProgress,
              private _confirmation: ConfirmationService,
              private _notificationsService: NotificationsService) {

  }

  ngOnInit() {
    this.initBreadcrumb();
    this.getListAccount(this.currentPage, this.itemPerPage);
  }

  getListAccount(page: number, pageSize: number) {
    this.progress.start();
    this.accountService.getListAccount(page, pageSize).subscribe(pagingData => {
      const returnData: PagingData<Account> = pagingData;
      if (returnData) {
        this.listAccount = returnData.data;
        console.log(this.listAccount);
        this.total = returnData.total;
        let max = Math.floor(this.total / this.itemPerPage);
        if (this.total % this.itemPerPage > 0) {
          max++;
        }
        this.numPages = max;
        this.pages = [];
        for (let i = 0; i < max; i++) {
          this.pages.push(i + 1);
        }
      }
      this.progress.complete();
    });
  }

  onClickAdd() {
    this.mode = MessageConstant.NEW;
    this.selectedAccount = new Account();
    this.changeBreadcrumb(this.mode);
  }

  onClickView(index: number) {
    this.mode = MessageConstant.VIEW;
    this.selectedAccount = this.listAccount[index];
    this.changeBreadcrumb(this.mode);
  }

  onClickUpdate(index: number) {
    this.mode = MessageConstant.UPDATE;
    this.selectedAccount = this.listAccount[index];
    this.changeBreadcrumb(this.mode);
  }

  onClickDelete(index: number) {
    this._confirmation.create('Chú ý', 'Bạn có chắc chắn muốn xóa ?')
    // The confirmation returns an Observable Subject which will notify you about the outcome
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.progress.start();
          this.accountService.deleteAccount(this.listAccount[index]).subscribe(result => {
            if (result) {
              this.showAlertMessage('Xóa tài khoản thành công',
                MessageConstant.ALERT_SUCCESS, 'Thành công');
              this.currentPage = 1;
              this.getListAccount(this.currentPage, this.itemPerPage);
            } else {
              console.log('loi');
              this.showAlertMessage('Xóa tài khoản không thành công',
                MessageConstant.ALERT_DANGER, 'Lỗi');
            }
            this.progress.complete();
          });
        }
      });
  }

  showAlertMessage(content: string, type: string, title: string) {
    this._notificationsService.create(
      title, content, type, this.options
    );
  }

  backFromSaveForm(data: MessageData) {
    this.mode = this.LIST;
    this.listAccount = [];
    this.getListAccount(this.currentPage, this.itemPerPage);
    if (data && data.showMessage) {
      this.showAlertMessage(data.message, data.type, data.title);
    }
  }

  initBreadcrumb() {
    this.breadcrumb.push(new BreadcrumbData('management.account.caption', ''));
  }

  changeBreadcrumb(mode: number) {
    this.breadcrumb.splice(-1, 1);
    if (MessageConstant.LIST === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.account.caption', ''));
    } else if (MessageConstant.NEW === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.account.new', ''));
    } else if (MessageConstant.UPDATE === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.account.update', ''));
    } else if (MessageConstant.VIEW === mode) {
      this.breadcrumb.push(new BreadcrumbData('management.account.view', ''));
    }
  }
}
