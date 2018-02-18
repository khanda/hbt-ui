import {Employee} from '../entity/Employee';

export class ConvertUtil {
  public static getFullName(employee: Employee) {
    if (!employee) {
      return '';
    }
    let fullName = '';
    if (employee.lastName) {
      fullName = employee.lastName;
    }
    if (employee.midName) {
      fullName += ' ' + employee.midName;
    }
    if (employee.firstName) {
      fullName += ' ' + employee.firstName;
    }

    return fullName;
  }
}
