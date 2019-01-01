import { Component, OnInit, Input } from '@angular/core';
import { OrdersResponse } from '../interfaces';

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
  
  constructor() { }
  @Input() data: OrdersResponse[];
  tableData;
  tableHeaders = [];
  tableKeys = [];
  displayNoDataMessage: boolean = false;

  ngOnInit() {
    if (this.isDataWithResults()) {
      this.buildTableData();
      this.tableHeaders = Object.values(TableHeadersKeyMap);
      this.tableKeys = Object.keys(TableHeadersKeyMap)
    } else {
      this.displayNoDataMessage = true;
    }
  }
  
  buildTableData() {
    this.data.forEach((order, index) => {
      this.tableData[index] = {
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

  isDataWithResults() {
    return this.data.length > 0;
  }
  
}
