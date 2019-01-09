import { StateService } from '../../services/state.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IStore, IPOS, IOrdersPayload } from '../../interfaces';
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
  storesList: IStore[];
  @ViewChild('suggestionsMenu') suggestionsMenu: NgbDropdown;
  ordersForm: FormGroup;
  inputSub$: Subscription;
  availableStoresSuggestion: IStore[];
  storePosList: IPOS[];
  isSpinnerActive: boolean = false;
  isFormSubmitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private state: StateService) { }
  
  ngOnInit() {
    this.state.storesSub$.subscribe((storesList: IStore[]) => {
      this.storesList = storesList;
      this.buildForm();
    });
  };
  buildForm(): void {
    this.ordersForm = this.formBuilder.group({
      storeName: [null, Validators.required],
      pos: [{value: null, disabled: true}, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }
  subscribeToStoreInputChanges(): void {
    if (!this.inputSub$ || this.inputSub$.closed) {
      this.inputSub$ = this.ordersForm.get('storeName').valueChanges.subscribe(input => this.searchStore(input));
    }
  }
  unsubscribeFromStoreNameInput(): void {
    if (this.inputSub$) this.inputSub$.unsubscribe();
  }
  searchStore(searchsStr): void {
    searchsStr = searchsStr.trim();
    this.isSpinnerActive = true;
    this.resetSearchParams();
    
    let availableStores = this.storesList.filter(store => store.Name.includes(searchsStr));
    switch (availableStores.length) {
      case 0:
        // no match
        this.suggestionsMenu.close();
        this.ordersForm.get('storeName').setErrors({'noMatch': true}); 
        break;
      case 1:
        // one match
        (searchsStr === availableStores[0].Name) ? this.selectStore(availableStores[0]) : this.updateSuggestionsMenu(availableStores);
        break;
      default:
        // more than one match
        this.updateSuggestionsMenu(availableStores);
        break;
    }

    setTimeout(() => {
      this.isSpinnerActive = false;
    }, 1000);
  }
  selectStore(store): void {
    this.updateCurrentStoreParams(store);
    this.suggestionsMenu.close();
    this.unsubscribeFromStoreNameInput();
  }
  resetSearchParams(): void {
    this.ordersForm.get('pos').disable();
    this.storePosList = null;
    this.availableStoresSuggestion = null;
  }
  updateCurrentStoreParams(currentStore: IStore): void {
    this.ordersForm.get('pos').enable();
    this.ordersForm.get('storeName').setValue(currentStore.Name);
    this.storePosList = currentStore.POSList;
    this.isSpinnerActive = false;
  }
  updateSuggestionsMenu(availableStores: IStore[]): void {
    this.availableStoresSuggestion = availableStores;
    if (!this.suggestionsMenu.isOpen()) this.suggestionsMenu.open();
  }
  selectPos(pos: IPOS): void {
    this.ordersForm.get('pos').setValue(pos.Name);
  }
  getReport(): void {
    let payload = this.buildReportPayload(); 
    this.state.getOrders(payload);
    this.state.updateCurrentSearchParams(this.ordersForm.value)
    if (!this.isFormSubmitted) this.isFormSubmitted = true;
  }
  buildReportPayload(): IOrdersPayload {
    let payload = {} as IOrdersPayload;
    let startDate = this.ordersForm.get('startDate').value;
    let endDate = this.ordersForm.get('endDate').value;
    
    payload.posId = this.ordersForm.get('pos').value;
    payload.startDate = `${startDate.month}/${startDate.day}/${startDate.year}`;
    payload.endDate = `${endDate.month}/${endDate.day}/${endDate.year}`;
    
    return payload;
  }
}


