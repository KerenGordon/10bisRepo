import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersPayload } from './interfaces';

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
  
  constructor(private _http: HttpClient) { }
  
  createParams(actionName, additinalParams?) {
    let params = {};
    switch (actionName) {
      case GetActions.stores:
        return { token: Token };
      case GetActions.pos:
        params['token'] = Token;
        params['storeId'] = additinalParams.storeId;
        return params;
      case GetActions.orders: 
        params['token'] = Token;
        // params['posId'] = additinalParams.posId;
        params['posId'] = 12395;
        params['startDate'] = additinalParams.startDate;
        params['endDate'] = additinalParams.endDate;
        return params;
      default:
      break;
    }
    
    
  }
  getStores() {
    return this._http.get(URL + GetActions.stores, { params : this.createParams(GetActions.stores) });
  }
  
  getPosList(storeId: string) {
    let params = this.createParams(GetActions.pos, {'storeId': storeId});
    return this._http.get(URL + GetActions.pos, { params : params });
  }
  
  getOrders(payload: OrdersPayload) {
    return this._http.get(URL + GetActions.orders, { 
      params : this.createParams(GetActions.orders, payload)
    });
  }
  
}
