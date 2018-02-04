import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-table-button',
  templateUrl: './action-table-button.component.html',
  styleUrls: ['./action-table-button.component.css']
})
export class ActionTableButtonComponent implements OnInit {

  @Output() clickView: EventEmitter<any> = new EventEmitter();
  @Output() clickUpdate: EventEmitter<any> = new EventEmitter();
  @Output() clickDelete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }


  onClickView() {
    this.clickView.emit(true);
  }

  onClickUpdate() {
    this.clickUpdate.emit(true);
  }

  onClickDelete() {
    this.clickDelete.emit(true);
  }
}
