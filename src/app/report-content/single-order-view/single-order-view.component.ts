import { IOrderDataTable } from './../../interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-order-view',
  templateUrl: './single-order-view.component.html',
  styleUrls: ['./single-order-view.component.scss']
})
export class SingleOrderViewComponent implements OnInit {
  @Input() order: IOrderDataTable;
  orderProperties = [];
  constructor(public activeModal: NgbActiveModal) { }
  
  ngOnInit() {
    this.orderProperties = Object.keys(this.order);
  }

}
