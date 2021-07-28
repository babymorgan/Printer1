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
  this.listPrinter();
}



  
getBluetoothList(): void {
  this.bluetoothList = [];

  }


  selectPrinter(macAddress)
{
  this.selectedPrinter= macAddress;
}



print(){

  let  trims = "Terima Kasih\n";
  let separator  = "--------------------------------\n";
  let title = "                  LFC\n     Latihan Pijit Enak\n\n"
  let tanggal = "Tanggal        : 03-12-2020\n";
  let noInvoice = "No Invoice   : IV20200001 \n";
  let customer = "Nama           : Ferdian Arief\n";
  let header = "    Item              Biaya\n";
  let item = "   #101          Rp. 9.000,-\n\n"
  let total = "     Total         Rp. 9.000,-\n\n\n";

  let invoicePage:string =  title + tanggal + noInvoice + customer + separator + header + separator + item + separator + total + trims;

   this.printer.printBT(this.selectedPrinter,invoicePage)
}

}
