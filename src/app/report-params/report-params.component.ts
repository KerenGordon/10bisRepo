import { ExhttpService } from './../exhttp.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Store, POS, OrdersPayload } from '../interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';




@Component({
  selector: 'app-report-params',
  templateUrl: './report-params.component.html',
  styleUrls: ['./report-params.component.scss']
})
export class ReportParamsComponent implements OnInit {
  @Input() storesList: Store[];
  @ViewChild('suggestionsMenu') suggestionsMenu: ElementRef;
  form: FormGroup;
  storeSuggestions: Store[];
  posList: POS[];
  isSpinnerActive = false;
  tableData: Object;
  
  constructor(private _httpService: ExhttpService, private _fb: FormBuilder) { }
  
  ngOnInit() {
    this.buildForm();
    this.subscribeToStoreNameInput();
  }
  
  buildForm(): void {
    this.form = this._fb.group({
      storeName: [null, Validators.required],
      pos: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  subscribeToStoreNameInput() {
    this.form.get('storeName').valueChanges.pipe(debounceTime(250)).subscribe(input => {
      console.log('input: ', input);
      this.searchStore(input) } )
  }

  searchStore(searchsStr): void {
    searchsStr = searchsStr.trim();
    this.isSpinnerActive = true;
    this.resetSearchParams();
    
    let result = this.storesList.filter(store => store.Name.includes(searchsStr) );
    if (result.length) {
      this.storeSuggestions = result;
      this.openSuggestionsMenu();
    } else this.form.get('storeName').setErrors({'noMatch': true});
    setTimeout(() => {
      this.isSpinnerActive = false;
    }, 1000);
  }
  
  openSuggestionsMenu() {
    let menu: HTMLElement = this.suggestionsMenu.nativeElement as HTMLElement;
    menu.click();
  }
  
  selectStore(store) {
    this.updateCurrentStoreParams(store);
  }
  
  resetSearchParams(): void {
    this.posList = null;
    this.storeSuggestions = null;
    this.form.get('pos').setValue(null);
  }
  
  updateCurrentStoreParams(currentStore: Store): void {
    this.form.get('storeName').setValue(currentStore.Name);
    this.posList = currentStore.POSList;
    this.isSpinnerActive = false;
  }
  
  // updatePos(pos: POS): void {
  //   this.form.get('posName').setValue(pos.Name);
  // }
  
  getReport(): void {
    let payload = this.buildReportPayload(); 
    
    this._httpService.getOrders(payload).subscribe(response => {
      this.tableData = response['Data'];
    })
  }
  
  buildReportPayload(): OrdersPayload {
    let payload = {} as OrdersPayload;
    let startDate = this.form.get('startDate').value;
    let endDate = this.form.get('endDate').value;
    
    payload.posId = this.form.get('pos').value;
    payload.startDate = `${startDate.month}/${startDate.day}/${startDate.year}`;
    payload.endDate = `${endDate.month}/${endDate.day}/${endDate.year}`;
    
    return payload;
  }
  
  
}


