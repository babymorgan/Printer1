import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { PrinterSetting, PrinterType, PrintType } from '../model/localDataModels';
import { PrintContentService, PrintContentBody } from "./printcontent.service";
import { PrintTemplate } from "../model/print-template";

@Injectable({
  providedIn: 'root'
})
export class PrintBluetoothService {
  currentIPAddress: string;
  BASE64_MARKER = ';base64,';
  constructor(
    private bluetoothSerial: BluetoothSerial,
    public body: PrintContentBody,
    public printcontent: PrintContentService,
  
  ) {
  }


  getBluetoothList(): Promise<any> {
    return this.bluetoothSerial.list();
  }

  connectToBluetoothPrinter(macAddress)
{
   return this.bluetoothSerial.connect(macAddress)
}

  disconnectBt() {
    return this.bluetoothSerial.disconnect();
  }

  

printBT(data_string,macAddress) {
  
  this.connectToBluetoothPrinter(macAddress)
  .subscribe(()=>{

    this.bluetoothSerial.write(data_string)
  })
}
  
}





