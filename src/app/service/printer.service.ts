import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";

@Injectable({
  providedIn: 'root'
})
export class PrintBluetoothService {
  currentIPAddress: string;
  BASE64_MARKER = ';base64,';
  constructor(
    private bluetoothSerial: BluetoothSerial
  ) {
  }


  getBluetoothList(): Promise<any> {
    return this.bluetoothSerial.list();
  }

  connectBt(macAddress) {
    return this.bluetoothSerial.connect(macAddress)
  }

  disconnectBt() {
    return this.bluetoothSerial.disconnect();
  }

  sendToBt(macAddress, data_string) {

    this.connectBt(macAddress).subscribe(_ => {
      this.bluetoothSerial.write(data_string).then
        (_ => {
          this.disconnectBt()
        })
    })
  }
}