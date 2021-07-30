import { Component, OnInit } from '@angular/core';
import { PrintBluetoothService } from '../service/printer.service';
import { Platform } from '@ionic/angular';
import { PrinterSetting } from '../model/localDataModels';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  bluetoothList: any[];
  selectedPrinter:any;
  setting: PrinterSetting

  constructor(public platform: Platform, private printer: PrintBluetoothService) {}

  listPrinter() { 
    this.printer.getBluetoothList()
     .then(resp=>{
      this.bluetoothList=resp;
     
  });
}

ngOnInit() {

 this.bluetoothList = []

 
}

getBluetoothList(): void {
  this.bluetoothList = [];

  }

  selectPrinter(macAddress)
{
  this.selectedPrinter= macAddress;
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

print(): void{
  let content: string = this.receipt;
  this.printer.printReceipt(content, this.template, this.setting)
}









//print(){
//
//  let  trims = "Terima Kasih\n";
//  let separator  = "--------------------------------\n";
//  let title = "                  LFC\n     Latihan Pijit Enak\n\n"
//  let tanggal = "Tanggal        : 03-12-2020\n";
//  let noInvoice = "No Invoice   : IV20200001 \n";
//  let customer = "Nama           : Ferdian Arief\n";
//  let header = "    Item              Biaya\n";
//  let item = "   #101          Rp. 9.000,-\n\n"
//  let total = "     Total         Rp. 9.000,-\n\n\n";
//
//  let invoicePage:string =  title + tanggal + noInvoice + customer + separator + header + separator + item + separator + total + trims;
//
//   this.printer.printBT(this.selectedPrinter,invoicePage)
//}

}
