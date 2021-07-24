import { Injectable } from '@angular/core';
import { PrintType, PrinterSetting } from '../model/localDataModels'
import { DecimalPipe, DatePipe } from '@angular/common';

let ctrl: any;

@Injectable({
    providedIn: 'root'
  })

  export class PrintContentService {
    Data: any;
    Template: any;
    Config: any;
    maxlength: number;
    PrinterSetting: PrinterSetting;
    limit: number = 12;
    isBluetooth: boolean;

    constructor(
        public decimalPipe: DecimalPipe,
        public datePipe: DatePipe
      ) {
        ctrl = this;
      }
  }

  @Injectable({
    providedIn: 'root'
  })
  export class PrintContentBody extends PrintContentService{
      
  }
