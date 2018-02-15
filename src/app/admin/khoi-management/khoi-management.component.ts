import {Component, OnInit} from '@angular/core';
import {Khoi} from '../../entity/Khoi';
import {BreadcrumbData} from '../../entity/BreadcrumbData';
import {KhoiService} from '../../service/khoi.service';

@Component({
  selector: 'app-khoi-management',
  templateUrl: './khoi-management.component.html',
  styleUrls: ['./khoi-management.component.css']
})
export class KhoiManagementComponent implements OnInit {

  khois: Khoi[] = [];
  breadcrumb: BreadcrumbData[] = [];

  constructor(private khoiService: KhoiService) {
  }

  ngOnInit() {
    this.initBreadcrumb();
    this.getListKhoi();
  }

  initBreadcrumb() {
    this.breadcrumb.push(new BreadcrumbData('management.khoi.header', ''));
  }

  getListKhoi() {
    this.khoiService.getListKhoi().subscribe(data => {
      if (data) {
        this.khois = data;
      }
    });
  }
}
