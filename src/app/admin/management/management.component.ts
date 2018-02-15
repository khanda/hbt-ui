import {Component, OnInit} from '@angular/core';
import {RouteConstant} from '../../constant/RouteConstant';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  MANAGEMENT_EMPLOYEES_ROUTE = RouteConstant.EMPLOYEES;
  MANAGEMENT_ACCOUNTS_ROUTE = RouteConstant.ACCOUNTS;
  KHOI_ACCOUNTS_ROUTE = RouteConstant.KHOI;
  isCollapsed = false;

  collapsed(event: any): void {
    console.log(event);
  }

  expanded(event: any): void {
    console.log(event);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
