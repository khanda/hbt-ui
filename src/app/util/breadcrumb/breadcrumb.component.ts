import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbData} from '../../entity/BreadcrumbData';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items: BreadcrumbData[];

  constructor() {
  }

  ngOnInit() {
  }

}
