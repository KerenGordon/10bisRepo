import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportParamsComponent } from './report-params/report-params.component';
import { ReportContentComponent } from './report-content/report-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { SingleItemViewComponent } from './report-content/single-item-view/single-item-view.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


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
    PerfectScrollbarModule,
    NgbModule.forRoot()

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [SingleItemViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
