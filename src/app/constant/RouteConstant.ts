export class RouteConstant {
  // single constant
  public static readonly NONE = '';
  public static readonly HOME = 'trang-chu';
  public static readonly LOGIN = 'dang-nhap';
  // admin
  public static readonly MANAGEMENT = 'management';
  public static readonly ACCOUNTS = 'accounts';
  public static readonly SAVE_ACCOUNT = 'save-account';
  public static readonly EMPLOYEES = 'employees';
  public static readonly KHOI = 'khois';
  // full route
  public static readonly MANAGEMENT_ACCOUNTS = RouteConstant.MANAGEMENT + '/' + RouteConstant.ACCOUNTS;
  public static readonly MANAGEMENT_SAVE_ACCOUNT = RouteConstant.MANAGEMENT + '/' + RouteConstant.SAVE_ACCOUNT;
  public static readonly MANAGEMENT_EMPLOYEES = RouteConstant.MANAGEMENT + '/' + RouteConstant.EMPLOYEES;
}
