import { Component } from '@angular/core';
import { PrintBluetoothService } from '../service/printer.service';
import { Platform } from '@ionic/angular';
import { PrinterSetting } from '../model/localDataModels';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  bluetoothList: any[];
  selectedPrinter:any;
  setting: PrinterSetting;
  title: string;
  constructor(public platform: Platform, private printer: PrintBluetoothService) {}
  
  ngOnInit() {
  
    this.getBluetoothList();
  
  }

  listPrinter() { 
    this.printer.getBluetoothList()
     .then(resp=>{
      this.bluetoothList=resp;
  });
}

  
  getBluetoothList(): void {
    this.bluetoothList = [];
    if (this.platform.is('android')) {
      this.printer.getBluetoothList().then(data => {
        this.bluetoothList = data;
      }, err => alert(err));

      console.log(this.bluetoothList)
    }
  
  }

  selectPrinter(IPAddress)
{
  this.selectedPrinter=IPAddress;
}

receipt: any = {
  "ImageEpsonUrl": "",
  "ImageEpsonWidth": 450,
  "ImageEpsonHeight": 42,
  "Title": "Invoice #17.03.011",
  "Date": "1 Jan 2018",
  "Items": [
    {
      "Variant": { "Name": "Muffin", },
      "Quantity": 2,
      "UnitPrice": 15000,
      "Discount": 0,
      "Total": 30000
    },
    {
      "Variant": { "Name": "Juice" },
      "Quantity": 1,
      "UnitPrice": 20000,
      "Discount": 0,
      "Total": 20000
    }
  ],
  "AmountSummary": [
    { "Label": "Amount", "CurrencySymbol": "Rp", "Amount": 50000 },
    { "Label": "Discount (20%)", "CurrencySymbol": "Rp", "Amount": -16000 },
    { "Label": "Total", "CurrencySymbol": "Rp", "Amount": 34000 }
  ]
};

template: any = { Name: 'DealPOS', Address: 'JL. Muara Karang No.30<br />Pluit - Jakarta Utara', ContactInfo: '+62(21) 66600886' };

Print() : void{
  let content: string = this.receipt;
  this.printer.printSingleReceipt(content,this.template,null,this.setting).then(async result=>{
   "Susccess!"
  })
}
}
