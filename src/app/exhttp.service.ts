import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrdersPayload, IStore, IHttpGetParams } from './interfaces';
import { Observable } from 'rxjs';

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
  getStores(): Observable<any> {
    return this._http.get(URL + GetActions.stores, {
      params : this.createParams(GetActions.stores) as {}
  });
  }
  
  getPosList(storeId: string): Observable<any> {
    let params = this.createParams(GetActions.pos, {'storeId': storeId});
    return this._http.get(URL + GetActions.pos, { 
      params : params as {} 
    });
  }
  
  getOrders(payload: IOrdersPayload): Observable<any> {
    return this._http.get(URL + GetActions.orders, { 
      params : this.createParams(GetActions.orders, payload) as {}
    });
  }
  
}
