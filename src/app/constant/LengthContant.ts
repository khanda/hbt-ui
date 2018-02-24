export class LengthConstant {

  public static readonly ACCOUNT_NAME_MAX_LENGTH = 30;
  public static readonly PASSWORD_MAX_LENGTH = 30;
  public static readonly NAME_MAX_LENGTH = 30;

  public static readonly ACCOUNT_NAME_MIN_LENGTH = 6;
  public static readonly PASSWORD_MIN_LENGTH = 6;
  public static readonly NAME_MIN_LENGTH = 1;

  /*Expression for characters, vietnam characters, space*/
  public static readonly VN_NAME_REG = '^[a-zA-Z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+$';
}
