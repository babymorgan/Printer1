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

  FillData(data: any, template: any, config: any, set: PrinterSetting, type: PrintType, printertype: PrinterType): string {
    //Fill Data Print
    this.body.Data = data;
    this.body.Template = template;
    this.body.Config = config;
    this.body.maxlength = set.MaxLength;
    this.body.PrinterSetting = set;
    
    this.body.isBluetooth = printertype == PrinterType.Network ? false : true;
    let content: string = "";
    if (type == PrintType.Receipt) {
      content += this.body.GenerateContent(type);
    } else {
      content += this.body.GenerateContentPark(type);
    }
    return content;
  }


  getBluetoothList(): Promise<any> {
    return this.bluetoothSerial.list();
  }

 

  disconnectBt() {
    return this.bluetoothSerial.disconnect();
  }

  Write(content: string, printer: PrinterSetting, ) {
    if (printer.Cut) content += this.printcontent.Feed(2);
    let cut = this.HexToUint(printer.Code_Cutter);
    let printData = this.HexToUint(printer.Code_Eject);

    this.bluetoothSerial.write(content);
    if(printer.Cut){
      this.bluetoothSerial.write(cut.buffer);
    }   
  
  }

  private HexToUint(hex: string): Uint8Array {
    return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  }
  

  sendToBt(macAddress, content:string, printer: PrinterSetting) {

    this.bluetoothSerial.connect(macAddress).subscribe(_ => {
      this.Write(content, printer);
       
    })
  }

   Print(content: string, printer: PrinterSetting, template: PrintTemplate, internal: String = "false"){
    this.bluetoothSerial.connect(printer.IPAddress).subscribe(_ => {
      this.Write(content, printer);
    })
    }

  async printSingleReceipt(data: any, template: any, config: any, printer?: PrinterSetting): Promise<any> { 
    let  content : string = await this.FillData(data, template, config, printer, PrintType.Receipt, printer.Type);
    let info =  await this.Print(content, printer, template);
  }
}