import { Component, OnInit } from '@angular/core';
import { ExhttpService } from './exhttp.service';
import { Store } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _httpService: ExhttpService) {}
  title = 'paypo-app';
  storesList = {};
  ngOnInit() {
    // get Stores 
    this._httpService.getStores().subscribe( (res: Store[]) => {
      this.storesList = res;
    }, 
    error => {
      this.storesList = [];
    })
  }
}
