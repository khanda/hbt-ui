import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() total: number;
  @Input() itemPerPage: number;
  @Input() pages: number[];

  @Output() updateList = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.updateListData(this.currentPage);
    }
  }

  updateListData(page: number) {
    this.updateList.emit(page);
  }
}
