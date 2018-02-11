import {Department} from './Department';
import {Account} from './Account';
/**
 * Created by quyen on 2/5/18.
 */

export class Employee {
  id: number;
  firstName: string;
  midName: string;
  lastName: string;
  departmentId: number;
  code: string;
  accountId: number;
  managerId: number;
  isLeader: number;
  createBy: string;
  updateBy: string;
  createDate: Date;
  updateDate: Date;
  status: number;
  department?: Department;
  account?: Account;
}
