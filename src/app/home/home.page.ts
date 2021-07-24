import { Component } from '@angular/core';
import { PrintBluetoothService } from '../service/printer.service';
import { NavParams, ModalController,Platform } from '@ionic/angular';
import { PrinterSetting, PrinterType } from '../model/localDataModels';

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

  selectPrinter(macAddress)
{
  this.selectedPrinter=macAddress;
}

printStuff()
{  
   var myText="Hello hello hello \n\n\n This is a test \n\n\n";
   this.printer.sendToBt(this.selectedPrinter,myText);
}


}
