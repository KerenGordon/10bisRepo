import { ExhttpService } from './../exhttp.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store, POS, OrdersPayload } from '../interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-report-params',
  templateUrl: './report-params.component.html',
  styleUrls: ['./report-params.component.scss']
})
export class ReportParamsComponent implements OnInit {
  @Input() storesList: Store[];
  @ViewChild('suggestionsMenu') suggestionsMenu: NgbDropdown;
  ordersForm: FormGroup;
  $inputSub: Subscription;
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
    this.ordersForm = this._fb.group({
      storeName: [null, Validators.required],
      pos: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }
  
  subscribeToStoreNameInput() {
    if (!this.$inputSub || this.$inputSub.closed) this.$inputSub = this.ordersForm.get('storeName').valueChanges.pipe(debounceTime(250)).subscribe(input => {
      this.searchStore(input) } )
    }
    unsubscribeFromStoreNameInput() {
      if (this.$inputSub) this.$inputSub.unsubscribe()
    }
    
    searchStore(searchsStr): void {
      searchsStr = searchsStr.trim();
      this.isSpinnerActive = true;
      this.resetSearchParams();
      
      let result = this.storesList.filter(store => store.Name.includes(searchsStr) );
      if (result.length === 1) this.selectStore(result[0])
      else if (result.length) {
        this.storeSuggestions = result;
        if (!this.suggestionsMenu.isOpen()) this.suggestionsMenu.open();
      } else {
        this.suggestionsMenu.close();
        this.ordersForm.get('storeName').setErrors({'noMatch': true}); 
      }
      setTimeout(() => {
        this.isSpinnerActive = false;
      }, 1000);
    }
    
    selectStore(store) {
      this.updateCurrentStoreParams(store);
      this.suggestionsMenu.close();
      this.unsubscribeFromStoreNameInput();
    }
    
    resetSearchParams(): void {
      this.posList = null;
      this.storeSuggestions = null;
      this.ordersForm.get('pos').setValue(null);
    }
    
    updateCurrentStoreParams(currentStore: Store): void {
      this.ordersForm.get('storeName').setValue(currentStore.Name);
      this.posList = currentStore.POSList;
      this.isSpinnerActive = false;
    }
    
    selectPos(pos: POS): void {
      console.log('pos: ', pos);
      this.ordersForm.get('pos').setValue(pos.Name);
    }
    
    getReport(): void {
      let payload = this.buildReportPayload(); 
      
      this._httpService.getOrders(payload).subscribe(response => {
        this.tableData = response['Data'];
      })
    }
    
    buildReportPayload(): OrdersPayload {
      let payload = {} as OrdersPayload;
      let startDate = this.ordersForm.get('startDate').value;
      let endDate = this.ordersForm.get('endDate').value;
      
      payload.posId = this.ordersForm.get('pos').value;
      payload.startDate = `${startDate.month}/${startDate.day}/${startDate.year}`;
      payload.endDate = `${endDate.month}/${endDate.day}/${endDate.year}`;
      
      return payload;
    }
    
    
  }
  
  
