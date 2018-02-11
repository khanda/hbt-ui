import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button-new',
  templateUrl: './button-new.component.html',
  styleUrls: ['./button-new.component.css']
})
export class ButtonNewComponent implements OnInit {
  @Input() showAddButton;
  @Output() clickAdd: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }


  onAddClick() {
    this.clickAdd.emit(true);
  }

}
