import { UtilsService } from './../../services/utils.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-item-view',
  templateUrl: './single-item-view.component.html',
  styleUrls: ['./single-item-view.component.scss']
})
export class SingleItemViewComponent implements OnInit {
  @Input() singleItem;
  @Input() title = ' ';
  itemProperties;
  // flattenItem;
  constructor(public activeModal: NgbActiveModal, private _utils: UtilsService) { }
  
  ngOnInit() {
    // this.buildData();
    this.itemProperties = Object.keys(this.singleItem).filter(item => !this.isObject(item));
  }
  isObject(field) {
    return typeof this.singleItem[field] === 'object';
  }

}
