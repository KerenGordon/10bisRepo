import { IOrdersPayload, IOrdersResponse } from './../interfaces';
import { ExhttpService } from './exhttp.service';
import { Injectable } from '@angular/core';
import { IOrderResponse, IStore, ISearchFields as ISearchParams, IPOS } from '../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  storesSub$ = new BehaviorSubject<IStore[]>([]);
  ordersSub$ = new BehaviorSubject<IOrderResponse[]>([]);
  currentSearchParams$ = new BehaviorSubject<ISearchParams>(null);
  
  constructor(private httpService: ExhttpService) { }
  initApp(): void {
    this.getStores();
  }
  getStores():void {
    this.httpService.getStores().subscribe((stores: IStore[]) => this.storesSub$.next(stores));
  }

  getOrders(payload: IOrdersPayload): void {
    this.httpService.getOrders((payload)).subscribe((orders: IOrdersResponse) => this.ordersSub$.next(orders.Data));
  }

  updateCurrentSearchParams(params: ISearchParams): void {
    this.currentSearchParams$.next(params);
  }

  getCurrentPosData(): IPOS {
    const currentSearchParams = this.currentSearchParams$.getValue();
    const currStore = this.storesSub$.getValue().find((store: IStore) => store.Name === currentSearchParams.storeName);
    const currPosData = currStore.POSList.find(currPos => currPos.Name === currentSearchParams.pos);
    return currPosData;
  }

}
