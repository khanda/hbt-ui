export class CredentialConstant {
  public static readonly prefix = 'htb_';
  public static readonly PREFIX = 'HBT_';
  public static readonly TOKEN = CredentialConstant.prefix + 'token';
  public static readonly USERNAME = CredentialConstant.prefix + 'username';
  public static readonly ID = CredentialConstant.prefix + 'id';
  public static readonly ROLE = CredentialConstant.prefix + 'role';
  public static readonly ROLE_DESCRIPTION = CredentialConstant.prefix + 'description';
  public static readonly TOKEN_PREFIX = 'Bearer ';
  // Roles
  public static readonly HBT_TEAM_LEADER = CredentialConstant.PREFIX + 'TEAM_LEADER';
  public static readonly HBT_SUPER_ADMIN = CredentialConstant.PREFIX + 'SUPER_ADMIN';
  public static readonly HBT_NORMAL = CredentialConstant.PREFIX + 'NORMAL';
  public static readonly HBT_PRINCIPLE = CredentialConstant.PREFIX + 'PRINCIPLE';
  public static readonly HBT_ASSISTANT_PRINCIPLE = CredentialConstant.PREFIX + 'ASSISTANT_PRINCIPLE';
}
