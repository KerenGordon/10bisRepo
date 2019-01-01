import { Component, OnInit } from '@angular/core';
import { IOrderResponse, IOrderDataTable } from '../interfaces';
import { ExhttpService } from '../exhttp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingleOrderViewComponent } from './single-order-view/single-order-view.component';

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
  
  constructor(private _httpService: ExhttpService, private modalService: NgbModal) { }
  ordersTableData: IOrderDataTable[];
  tableHeaders: string[];
  tableKeys: string[];
  
  ngOnInit() {
    this._httpService.ordersSub$.subscribe((ordersData: IOrderResponse[]) => {
      this.ordersTableData = []
      if (ordersData && ordersData.length > 0) this.initializeTable(ordersData);
    });
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

  openSingleView(order) {
    const modalRef = this.modalService.open(SingleOrderViewComponent);
    modalRef.componentInstance.order = order;
  }
  
}
