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
  itemProperties = [];
  constructor(public activeModal: NgbActiveModal) { }
  
  ngOnInit() {
    this.itemProperties = Object.keys(this.singleItem);
  }

}
