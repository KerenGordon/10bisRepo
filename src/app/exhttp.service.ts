import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrdersPayload as IOrderPayload, IHttpGetParams, IStore, IOrderResponse, IOrdersResponse } from './interfaces';
import { Observable, BehaviorSubject } from 'rxjs';

const Token = 'c30633f5-7bea-8af6-e49c-12e1e42ed0fe';
const URL = 'https://10.10.200.108:2121/API/';
const GetActions = {
  stores: 'GetStores',
  pos: 'GetPoses',
  orders: 'GetOrders'
}


@Injectable({
  providedIn: 'root'
})
export class ExhttpService {
  
  storesSub$ = new BehaviorSubject<IStore[]>([]);
  ordersSub$ = new BehaviorSubject<IOrderResponse[]>(null);
  
  constructor(private _http: HttpClient) { }
  
  createParams(actionName, additinalParams?): IHttpGetParams {
    let params: IHttpGetParams;
    params = { token: Token };
    
    switch (actionName) {
      case GetActions.stores:
      return params;
      case GetActions.pos:
      params.storeId = additinalParams.storeId;
      case GetActions.orders: 
      // params['posId'] = additinalParams.posId;
      params.posId = 12395;
      params.startDate = additinalParams.startDate;
      params.endDate = additinalParams.endDate;
      default:
    }
    return params;
  }
  getStores(): void {
    this._http.get(URL + GetActions.stores, {params : this.createParams(GetActions.stores) as {}})
    .subscribe((stores: IStore[]) => this.storesSub$.next(stores));
  }
  
  getPosList(storeId: string): Observable<any> {
    let params = this.createParams(GetActions.pos, {'storeId': storeId});
    return this._http.get(URL + GetActions.pos, { 
      params : params as {} 
    });
  }
  
  getOrders(payload: IOrderPayload): void {
    console.log('payload: ', payload);
    this._http.get(URL + GetActions.orders, { 
      params : this.createParams(GetActions.orders, payload) as {}
    }).subscribe((orders: IOrdersResponse) => this.ordersSub$.next(orders.Data));
  }
  
}
