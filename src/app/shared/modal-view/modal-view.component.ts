import { UtilsService } from '../../services/utils.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  @Input() dataToDisplay: Object;
  @Input() title: string = ' ';
  fieldNames: Array<string> = [];
  constructor(public activeModal: NgbActiveModal, private utils: UtilsService) { }
  
  ngOnInit() {
    this.fieldNames = Object.keys(this.dataToDisplay).filter(field => !this.isFieldValueAnObject(field));
  }
  isFieldValueAnObject(field) {
    let fieldValue = this.dataToDisplay[field];
    return this.utils.isObject(fieldValue);
  }

}
