import { Component, OnInit } from '@angular/core';
import { ExhttpService } from './services/exhttp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private _httpService: ExhttpService) {}

  title = 'paypo-app';

  ngOnInit() {
    this._httpService.getStores();
  }
}
