import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { promise } from "protractor";
import { PrinterSetting } from "../model/localDataModels";
import { PrintTemplate } from "../model/print-template";
import { PrintContentBody } from "./printcontent.service";

@Injectable({
  providedIn: 'root'
})
export class PrintBluetoothService {

  constructor(
    private bluetoothSerial: BluetoothSerial,
    public body: PrintContentBody,
    public setting: PrinterSetting
  
  ) {
  }




  getBluetoothList(){
    return this.bluetoothSerial.list();
  }

  connectBt(macAddress)
{
   return this.bluetoothSerial.connect(macAddress)
}

  disconnectBt() {
    return this.bluetoothSerial.disconnect();
  }

  printBT(macAddress, data_string, setting: PrinterSetting) {

    this.connectBt(macAddress).subscribe(_ => {
      this.bluetoothSerial.write(data_string).then
        (_ => {
          this.disconnectBt()
        })
    })
  }

  //fillData(data: any, template: any, config: any, set: PrinterSetting,): string {
  //  //Fill Data Print
  //  this.body.Data = data;
  //  this.body.Template = template;
  //  this.body.Config = config;
  //  this.body.maxlength = set.MaxLength;
  //  this.body.PrinterSetting = set;
  // 
  //  let content: string = "";
  //  content += this.body.GenerateContent
  // 
  //  return content;
  //}

  //async printReceipt(data:any, template: any, config: any,printer?:PrinterSetting): Promise<any> {
  //let content: string = await this.fillData(data, template, config, printer);
  //let info = await this.setPrint(content, printer, template);
  //return info;
  //}

  //setPrint(content:any, printer: PrinterSetting, template: PrintTemplate, ){
  //  let macAddress
  //  this.connectBt(macAddress).subscribe(_ => {
  //    this.bluetoothSerial.write(content).then
  //      (_ => {
  //        this.disconnectBt()
  //      })
  //  })
  //}

}





