import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-content-loader',
    templateUrl: './content-loader.component.html',
    styleUrls: ['./content-loader.component.scss']
})
export class ContentLoaderComponent implements OnInit {
    
    @Input() widthPercent = 100;
    @Input() heightPercent = 100;
    @Input() onFalseUserMessage = 'Something went wrong.';

    showContentIfValue = true;
    @Input() set showContentIf(value: boolean) {
        this.showContentIfValue = value;
        if (!this.showContentIf) {
            this.checkForTimeOut();
        }
    }
    get showContentIf(): boolean {
        return this.showContentIfValue;
    }
    
    timeoutCounter = 0;
    timeoutMax = 5;
    showTimeContent = false;


    constructor() {
    }

    ngOnInit() {
        this.checkForTimeOut();
    }

    checkForTimeOut() {
        let interval;
        this.showTimeContent = false;
        if (!this.showContentIfValue) {
            interval = setInterval(() => {
                this.timeoutCounter++;
                if (this.showContentIfValue) {
                    this.showTimeContent = false;
                    clearInterval(interval);
                }
                if (this.timeoutCounter >= this.timeoutMax) {
                    this.showTimeContent = true;
                    clearInterval(interval);
                }
                

            }, 1000);
        }
    }

}
