import { UtilsService } from '../../services/utils.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  @Input() dataToDisplay;
  @Input() title = ' ';
  dataProperties = [];
  constructor(public activeModal: NgbActiveModal, private utils: UtilsService) { }
  
  ngOnInit() {
    this.dataProperties = Object.keys(this.dataToDisplay).filter(item => !this.isObject(item));
  }
  isObject(field) {
    return this.utils.isObject(this.dataToDisplay[field]);
  }

}
