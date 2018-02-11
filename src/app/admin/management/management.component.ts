import { Component, OnInit } from '@angular/core';
import {RouteConstant} from '../../constant/RouteConstant';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  MANAGEMENT_EMPLOYEES_ROUTE = RouteConstant.EMPLOYEES;
  MANAGEMENT_ACCOUNTS_ROUTE = RouteConstant.ACCOUNTS;
  constructor() { }

  ngOnInit() {
  }

}
