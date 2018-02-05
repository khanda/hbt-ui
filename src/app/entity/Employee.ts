import {Department} from './Department';
/**
 * Created by quyen on 2/5/18.
 */

export class Employee {
  private _id: number;
  private _firstName: string;
  private _midName: string;
  private _lastName: string;
  private _departmentId: number;
  private _code: string;
  private _accountId: number;
  private _managerId: number;
  private _isLeader: number;
  private _createBy: string;
  private _updateBy: string;
  private _createDate: Date;
  private _updateDate: Date;
  private _status: number;
  private _department?: Department;
  private _account?: Account;


  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get midName(): string {
    return this._midName;
  }

  set midName(value: string) {
    this._midName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get departmentId(): number {
    return this._departmentId;
  }

  set departmentId(value: number) {
    this._departmentId = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get accountId(): number {
    return this._accountId;
  }

  set accountId(value: number) {
    this._accountId = value;
  }

  get managerId(): number {
    return this._managerId;
  }

  set managerId(value: number) {
    this._managerId = value;
  }

  get isLeader(): number {
    return this._isLeader;
  }

  set isLeader(value: number) {
    this._isLeader = value;
  }

  get createBy(): string {
    return this._createBy;
  }

  set createBy(value: string) {
    this._createBy = value;
  }

  get updateBy(): string {
    return this._updateBy;
  }

  set updateBy(value: string) {
    this._updateBy = value;
  }

  get createDate(): Date {
    return this._createDate;
  }

  set createDate(value: Date) {
    this._createDate = value;
  }

  get updateDate(): Date {
    return this._updateDate;
  }

  set updateDate(value: Date) {
    this._updateDate = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get department(): Department {
    return this._department;
  }

  set department(value: Department) {
    this._department = value;
  }

  get account(): Account {
    return this._account;
  }

  set account(value: Account) {
    this._account = value;
  }
}
