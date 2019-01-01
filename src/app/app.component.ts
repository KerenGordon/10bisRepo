import { Component, OnInit } from '@angular/core';
import { ExhttpService } from './exhttp.service';
import { IStore } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private _httpService: ExhttpService) {}

  title = 'paypo-app';
  // storesList: IStore[];

  ngOnInit() {
    // get Stores 
    // this._httpService.getStores().subscribe( (stores: IStore[]) => {
    //   this.storesList = stores;
    // });
    this._httpService.getStores();
  }
}
