import { StateService } from './services/state.service';
import { Component, OnInit } from '@angular/core';
import { ExhttpService } from './services/exhttp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private state: StateService) {}

  title = 'paypo-app';

  ngOnInit() {
    this.state.getStores();
  }
}
