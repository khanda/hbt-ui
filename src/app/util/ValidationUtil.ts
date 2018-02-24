export class ValidationUtil {
  public static isMatchRegex(pattern: string, testString: string): boolean {
    const regExp = new RegExp(pattern, 'g');
    return regExp.test(testString);
  }
}
