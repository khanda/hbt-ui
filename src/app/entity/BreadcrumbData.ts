/**
 * Created by quyen on 11/02/2018.
 */
export class BreadcrumbData {
  text: string;
  routeLink: string;

  constructor(text: string, routeLink: string) {
    this.text = text;
    this.routeLink = routeLink;
  }
}
