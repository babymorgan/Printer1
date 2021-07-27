import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";




@Injectable({
  providedIn: 'root'
})
export class PrintBluetoothService {

  constructor(
    private bluetoothSerial: BluetoothSerial,

  
  ) {
  }


  getBluetoothList(){
    return this.bluetoothSerial.list();
  }

  connectToBluetoothPrinter(macAddress)
{
   return this.bluetoothSerial.connect(macAddress)
}

  disconnectBt() {
    return this.bluetoothSerial.disconnect();
  }

printBT(macAddress, data_string) {
  
  this.connectToBluetoothPrinter(macAddress)
  .subscribe(_=>{

    this.bluetoothSerial.write(data_string)
  })
}
  
}





