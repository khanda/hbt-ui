import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {
  @Input() showAddButton;
  @Input() showExportEcelButton;
  @Output() clickAdd: EventEmitter<any> = new EventEmitter();
  @Output() clickExportExcel: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }


  onAddClick() {
    this.clickAdd.emit(true);
  }

  onClickExportExcel() {
    this.clickExportExcel.emit(true);
  }
}
