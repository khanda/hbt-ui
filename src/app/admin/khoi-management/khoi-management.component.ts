import {Component, OnInit} from '@angular/core';
import {Khoi} from '../../entity/Khoi';
import {BreadcrumbData} from '../../entity/BreadcrumbData';
import {KhoiService} from '../../service/khoi.service';
import {EmployeeSearchComponent} from '../employee-search/employee-search.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Employee} from '../../entity/Employee';
import {ConfirmDialogComponent} from '../../util/confirm-dialog/confirm-dialog.component';
import {ConvertUtil} from '../../util/ConvertUtil';
import {NgProgress} from '@ngx-progressbar/core';
import {MessageConstant} from '../../constant/MessageConstant';
import {MyTranslate} from '../../service/my-translate.service';
import {SnackMessageComponent} from '../../util/snack-message/snack-message.component';

@Component({
  selector: 'app-khoi-management',
  templateUrl: './khoi-management.component.html',
  styleUrls: ['./khoi-management.component.css']
})
export class KhoiManagementComponent implements OnInit {
  khois: Khoi[] = [];
  breadcrumb: BreadcrumbData[] = [];
  selectedEmployee: Employee[] = [];
  selectedEmployeeFromModal: boolean[] = [];
  selectedIndex = -1;

  constructor(private khoiService: KhoiService,
              public progress: NgProgress,
              private myTranslate: MyTranslate,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initBreadcrumb();
    this.getListKhoi();
  }

  initBreadcrumb() {
    this.breadcrumb.push(new BreadcrumbData('management.khoi.header', ''));
  }

  getListKhoi() {
    this.khoiService.getListKhoi().subscribe(data => {
      if (data) {
        this.khois = data;
      }
    });
  }

  openDialog(index: number): void {
    this.selectedIndex = index;
    const dialogRef = this.dialog.open(EmployeeSearchComponent, {
      width: '100vw',
      minHeight: '80%',
      data: {khoi: this.khois[index]}
    });

    dialogRef.afterClosed().subscribe(selectedEmployee => {
      if (selectedEmployee) {
        this.selectedEmployee[this.selectedIndex] = selectedEmployee;
        this.selectedEmployeeFromModal[this.selectedIndex] = true;
        this.updateLeader(this.khois[index], selectedEmployee, index);
      }
    });
  }

  updateLeader(khoi: Khoi, employee: Employee, index: number) {
    const message = this.myTranslate.translateParam('label.choose.leader.confirm',
      {
        name: ConvertUtil.getFullName(employee),
        khoi: khoi.name
      });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: '', message: message}
    });
    dialogRef.afterClosed().subscribe(agree => {
      if (agree) {
        this.saveKhoi(khoi, employee, index);
      }
    });
  }

  saveKhoi(khoi: Khoi, employee: Employee, index: number) {
    khoi.leaderId = employee.id;
    this.progress.start();
    this.khoiService.saveKhoi(khoi).subscribe(savedkhoi => {
      if (savedkhoi != null && savedkhoi.id !== 0 && savedkhoi.id != null) {
        this.snackBar.openFromComponent(SnackMessageComponent, {
          duration: MessageConstant.TIMEOUT,
          data: {message: this.myTranslate.translateString('message.title.success'), mode: MessageConstant.ALERT_SUCCESS}
        });
        this.khois[index] = savedkhoi;
      } else {
        this.snackBar.openFromComponent(SnackMessageComponent, {
          duration: MessageConstant.TIMEOUT,
          data: {message: this.myTranslate.translateString('message.title.error'), mode: MessageConstant.ALERT_DANGER}
        });
      }
      this.progress.complete();
    });
  }

  onClickDelete(index: number) {
    const employee = this.khois[index].leader;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '',
        message: this.myTranslate.translateString('message.confirm.delete.khoi.leader') + ' ' + ConvertUtil.getFullName(employee)
      }
    });
    dialogRef.afterClosed().subscribe(agree => {
      if (agree) {
        this.deleteLeader(index);
      }
    });

  }

  deleteLeader(index: number) {
    this.khoiService.deleteLeader(this.khois[index]).subscribe(success => {
      if (success) {
        this.snackBar.openFromComponent(SnackMessageComponent, {
          duration: MessageConstant.TIMEOUT,
          data: {message: this.myTranslate.translateString('message.title.success'), mode: MessageConstant.ALERT_SUCCESS}
        });
        this.khois[index].leaderId = null;
      } else {
        this.snackBar.openFromComponent(SnackMessageComponent, {
          duration: MessageConstant.TIMEOUT,
          data: {message: this.myTranslate.translateString('message.title.error'), mode: MessageConstant.ALERT_DANGER}
        });
      }
    });
  }
}
