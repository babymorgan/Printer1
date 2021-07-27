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
  setting: PrinterSetting



 
  constructor(public platform: Platform, private printer: PrintBluetoothService) {}
  

  listPrinter() { 
    this.printer.getBluetoothList()
     .then(resp=>{
      this.bluetoothList=resp;
  });
}



  
getBluetoothList(): void {
  this.bluetoothList = [];

  }


  selectPrinter(macAddress)
{
  this.selectedPrinter= macAddress;
}



print(){

  var trims = "Terima Kasih\n";
  var separator  = "--------------------------------\n";
  var title = "                  LFC\n     Latihan Pijit Enak\n\n"
  var tanggal = "Tanggal        : 03-12-2020\n";
  var noInvoice = "No Invoice   : IV20200001 \n";
  var customer = "Nama           : Ferdian Arief\n";
  var header = "    Item              Biaya\n";
  var item = "   #101          Rp. 9.000,-\n\n"
  var total = "     Total         Rp. 9.000,-\n\n\n";

  var invoicePage:string =  title + tanggal + noInvoice + customer + separator + header + separator + item + separator + total + trims;

   this.printer.printBT(this.selectedPrinter,invoicePage)
}

}
