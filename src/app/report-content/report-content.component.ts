import { Component, OnInit, Input } from '@angular/core';
import { IOrdersResponse, IOrderDataTable } from '../interfaces';

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
  @Input() ordersData: IOrdersResponse[];
  ordersTableData: IOrderDataTable[] = [];
  tableHeaders: string[] = [];
  tableKeys: string[] = [];
  displayNoDataMessage: boolean = false;

  ngOnInit() {
    if (this.isOrdersData()) {
      this.buildTableData();
      this.tableHeaders = Object.values(TableHeadersKeyMap);
      this.tableKeys = Object.keys(TableHeadersKeyMap)
    } else {
      this.displayNoDataMessage = true;
    }
  }
  
  buildTableData() {
    this.ordersData.forEach((order, index) => {
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

  isOrdersData() {
    return this.ordersData && this.ordersData.length > 0;
  }
  
}
