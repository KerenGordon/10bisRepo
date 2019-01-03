import { SingleItemViewComponent } from '../../shared/single-item-view/single-item-view.component';
import { StateService } from '../../services/state.service';
import { Component, OnInit } from '@angular/core';
import { IOrderResponse, IOrderDataTable } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const TableHeadersKeyMap = {
  orderId: 'Order ID',
  startDate: 'Start Date',
  endDate: 'End Date',
  customerName: 'Customer Name',
  orderType: 'Order Type',
  phoneNumber: 'Phone Number',
  orderSum: 'Sum'
  
}

@Component({
  selector: 'app-report-content',
  templateUrl: './report-content.component.html',
  styleUrls: ['./report-content.component.scss']
})
export class ReportContentComponent implements OnInit {
  
  constructor(private _state: StateService, private modalService: NgbModal) { }
  ordersTableData: IOrderDataTable[];
  tableHeaders: string[];
  tableKeys: string[];
  
  ngOnInit() {
    this._state.ordersSub$.subscribe((ordersData: IOrderResponse[]) => {
      this.ordersTableData = []
      if (ordersData.length > 0) this.initializeTable(ordersData);
    });
    this._state.getCurrentPosData();
  }
  
  initializeTable(data) {
    this.buildTableData(data);
    this.tableHeaders = Object.values(TableHeadersKeyMap);
    this.tableKeys = Object.keys(TableHeadersKeyMap)
  }
  
  buildTableData(orders) {
    orders.forEach((order, index) => {
      this.ordersTableData[index] = {
        orderId: order.ID,
        startDate: order.EndTimeString,
        endDate: order.EndTimeString,
        customerName: order.CustomerName,
        orderType: order.PaymentMethodDisplayName,
        phoneNumber: order.CustomerPhoneNumber,
        orderSum: order.OrderSumString
      }
    });
  }

  openOrderSingleView(order) {
    const modalRef = this.modalService.open(SingleItemViewComponent);
    modalRef.componentInstance.singleItem = order;
    modalRef.componentInstance.title = 'Order Details';
  }

  openPosDetails() {
    const modalRef = this.modalService.open(SingleItemViewComponent);
    modalRef.componentInstance.singleItem = this._state.getCurrentPosData();;
    modalRef.componentInstance.title = 'POS Details';
    
  }
  
}
