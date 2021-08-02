import { Component, OnInit } from '@angular/core';
import { PrintBluetoothService } from '../service/printer.service';
import { Platform } from '@ionic/angular';
import { PrinterSetting } from '../model/localDataModels';
import {PrintContentService} from '../service/printcontent.service'
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { receiptModel } from '../model/receiptModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  bluetoothList: any[];
  selectedPrinter:any;
  setting: PrinterSetting
  content
  receipt = new receiptModel
  customer
  
  constructor(public platform: Platform, private printer: PrintBluetoothService, private contentService: PrintContentService) {}

  listPrinter() { 
    this.printer.getBluetoothList()
     .then(resp=>{
      this.bluetoothList=resp;
     
  });
}

ngOnInit() {
  this.listPrinter();
  //this.printContent();
  this.receipt
  
}



getBluetoothList(): void {
  this.bluetoothList = [];

  }

  selectPrinter(macAddress)
{
  this.selectedPrinter= macAddress;
}

//printContent(){
//  let  trims = "Terima Kasih\n";
//  let separator  = "--------------------------------\n";
//  let title  =  this.receipt.title+ "                 \n\n"
//  let tanggal = "Tanggal        : 03-12-2020\n";
//  let noInvoice = "No Invoice   : IV20200001 \n";
//  let customer = "Nama           :" + this.receipt.customer + "\n\n";
//  let header = "    Item              Biaya\n";
//  let item = "   #101          Rp. 9.000,-\n\n"
//  let total = "     Total         Rp. 9.000,-\n\n\n";
//
// this.content = title + tanggal + noInvoice + customer + separator + header + separator + item + separator + total + trims;
//
//}



//print(): void{
//  let content: string = this.receipt;
//  this.printer.printReceipt(content, this.template, this.setting)
//}


print(){

  let title = JSON.stringify(this.receipt.title)+ "                 \n\n"
  let  trims = "Terima Kasih\n";
  let separator  = "--------------------------------\n";
  let tanggal = "Tanggal        : 03-12-2020\n";
  let noInvoice = "No Invoice   : IV20200001 \n";
  let customer = "Nama           :" + JSON.stringify(this.receipt.customer) + "\n\n";
  let header = "    Item              Biaya\n";
  let item = "   #101          Rp. 9.000,-\n\n"
  let total = "     Total         Rp. 9.000,-\n\n\n";

this.content = title + tanggal + noInvoice + customer + separator + header + separator + item + separator + total + trims;


  let invoicePage = this.content
  console.log(invoicePage)
   this.printer.printBT(this.selectedPrinter,invoicePage, this.setting)
}

}
