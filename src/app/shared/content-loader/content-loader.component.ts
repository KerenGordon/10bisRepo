import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-content-loader',
    templateUrl: './content-loader.component.html',
    styleUrls: ['./content-loader.component.scss']
})
export class ContentLoaderComponent implements OnInit {
    
    @Input() widthPercent: number = 100;
    @Input() heightPercent: number = 100;
    @Input() onFalseUserMessage: string = 'Something went wrong.';

    isShowContent: boolean = true;
    @Input() set showContentIf(value: boolean) {
        this.isShowContent = value;
        if (!this.isShowContent) {
            this.checkForTimeOut();
        }
    }
    get showContentIf(): boolean {
        return this.isShowContent;
    }
    
    timeoutCounter: number = 0;
    timeoutMax: number = 5;
    showTimeoutContent = false;


    constructor() {
    }

    ngOnInit() {
        this.checkForTimeOut();
    }

    checkForTimeOut() {
        let interval;
        this.showTimeoutContent = false;
        if (!this.isShowContent) {
            interval = setInterval(() => {
                this.timeoutCounter++;
                if (this.isShowContent) {
                    this.showTimeoutContent = false;
                    clearInterval(interval);
                }
                if (this.timeoutCounter >= this.timeoutMax) {
                    this.showTimeoutContent = true;
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

}
