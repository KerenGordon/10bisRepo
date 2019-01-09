import { StateService } from './services/state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private state: StateService) {}

  ngOnInit() {
    this.state.initApp();
  }
}
