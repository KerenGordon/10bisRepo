import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ReportParamsComponent } from './report-params/report-params.component';
import { SingleItemViewComponent } from './shared/single-item-view/single-item-view.component';
import { ContentLoaderComponent } from './shared/content-loader/content-loader.component';
import { ReportContentComponent } from './report-params/report-content/report-content.component';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };

@NgModule({
  declarations: [
    AppComponent,
    ReportParamsComponent,
    ReportContentComponent,
    ContentLoaderComponent,
    SingleItemViewComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // PerfectScrollbarModule,
    NgbModule.forRoot()

  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // }
  ],
  entryComponents: [SingleItemViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
