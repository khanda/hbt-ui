import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserRole} from '../../entity/UserRole';
import {AccountService} from '../../service/account.service';
import {Account} from '../../entity/Account';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {regExpValidator} from '../../directive/regExp-validator.directive';
import {LengthContant} from '../../constant/LengthContant';
import {MessageConstant} from '../../constant/MessageConstant';
import {Router} from '@angular/router';
import {MessageData} from '../../entity/MessageData';
import {MyTranslate} from '../../service/my-translate.service';
import {CredentialData} from "../../entity/CredentialData";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-account-save',
  templateUrl: './account-save.component.html',
  styleUrls: ['./account-save.component.css']
})
export class AccountSaveComponent implements OnInit {
  readonly USERNAME_MIX = LengthContant.ACCOUNT_NAME_MIN_LENGTH;
  readonly PASSWORD_MIX = LengthContant.PASSWORD_MIN_LENGTH;
  readonly USERNAME_MAX = LengthContant.ACCOUNT_NAME_MAX_LENGTH;
  readonly PASSWORD_MAX = LengthContant.PASSWORD_MAX_LENGTH;
  readonly USERNAME_REG = /^[a-zA-Z0-9]+(?:[_ - @ .]?[a-zA-Z0-9]?)*$/i;
  readonly PASSWORD_REG = /^[a-zA-Z0-9]+(?:[_ - @ .]?[a-zA-Z0-9]?)*$/i;

  roleList: UserRole[] = [];
  selectedUserRole: UserRole;
  firstPassword = '';
  accountForm: FormGroup;

  // message controlling
  showMessageKey = MessageConstant.NONE;
  showMessagePasswordNotMatch = false;
  readonly ERROR = MessageConstant.ERROR;
  readonly SUCCESS = MessageConstant.SUCCESS;

  // mode
  readonly UPDATE = MessageConstant.UPDATE;
  readonly NEW = MessageConstant.NEW;
  readonly VIEW = MessageConstant.VIEW;

  @Input() mode = MessageConstant.VIEW;
  @Input() account: Account = new Account();
  @Output() backToList: EventEmitter<MessageData> = new EventEmitter();
  credentialData: CredentialData;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private authService: AuthService,
              private translate: MyTranslate,
              private router: Router) {
  }

  ngOnInit() {
    console.log('AccountSaveComponent: init');
    this.createForm();
    this.getRoles();
    this.credentialData = this.authService.getCredentialData();
  }

  createForm() {
    this.accountForm = this.fb.group({
      'userName': new FormControl(this.account.userName, [
        Validators.required,
        Validators.minLength(this.USERNAME_MIX),
        Validators.maxLength(this.USERNAME_MAX),
        regExpValidator(this.USERNAME_REG)
      ]),
      'userRole': new FormControl(this.account.roleId, [
        Validators.required
      ])

    });

    if (this.NEW === this.mode) {
      const passwordFormGroup = this.fb.group({
        'password': new FormControl(this.account.password, [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIX),
          Validators.maxLength(this.PASSWORD_MAX),
          regExpValidator(this.PASSWORD_REG)
        ]),
        'passwordConfirm': new FormControl('', [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIX),
          Validators.maxLength(this.PASSWORD_MAX),
          regExpValidator(this.PASSWORD_REG)
        ]),
      });
      this.accountForm.addControl('passwords', passwordFormGroup);

    }
    if (this.VIEW === this.mode) {
      this.accountForm.get('userRole').disable();
    }

  }

  getRoles() {
    this.accountService.getListRoles().subscribe(roles => {
      this.roleList = roles;
    });
  }

  getPasswordValue(event: string) {
    this.firstPassword = event;
  }

  onSelectRole(roleId: number) {
    this.selectedUserRole = this.roleList.find(role => role.id === roleId);
  }

  onClickBack() {
    const data = new MessageData();
    data.title = '';
    data.message = '';
    data.showMessage = false;
    data.type = MessageConstant.ALERT_SUCCESS;
    this.backToList.emit(data);
  }

  onSubmit() {
    const accountData = this.prepareDataToSave(this.accountForm.value, this.roleList);
    this.accountService.saveAccount(accountData).subscribe(_result => {
      if (_result) {
        const data = new MessageData();
        data.title = this.translate.translateString('message.title.success');
        data.message = this.translate.translateString('message.save.content.success');
        data.showMessage = true;
        data.type = MessageConstant.ALERT_SUCCESS;
        this.backToList.emit(data);
      } else {
        this.showMessageKey = this.ERROR;
      }
    });
  }

  get userName() {
    return this.accountForm.get('userName');
  }

  get userRole() {
    return this.accountForm.get('userRole');
  }

  get password() {
    return this.accountForm.get('passwords').get('password');
  }

  get passwordConfirm() {
    return this.accountForm.get('passwords').get('passwordConfirm');
  }

  get passwords() {
    return this.accountForm.get('passwords');
  }

  private prepareDataToSave(formValue: any, roleList: UserRole[]): Account {
    const acc: Account = this.account;
    acc.userName = formValue.userName;
    acc.password = this.mode === MessageConstant.NEW ? formValue.passwords.password : '';
    acc.roleId = formValue.userRole;
    acc.userRole = roleList.find(role => role.id === acc.roleId);
    acc.status = 1;
    if (this.mode === this.NEW) {
      acc.createBy = this.credentialData.userName;
    } else if (this.mode === this.UPDATE) {
      acc.updateBy = this.credentialData.userName;
    }
    return acc;
  }

  passwordConfirming(abstractControl: AbstractControl): { invalid: boolean } {
    if (abstractControl.get('password').value !== abstractControl.get('passwordConfirm').value) {
      return {invalid: true};
    }
  }

  onChangeConfirmedPassword(event) {
    const password = this.accountForm.value.passwords.password;
    this.showMessagePasswordNotMatch = password !== event;
  }
}
