import { Component, OnInit } from '@angular/core';
import { receiptModel } from '../model/receiptModel';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.page.html',
  styleUrls: ['./receipt-form.page.scss'],
})
export class ReceiptFormPage implements OnInit {

  constructor() { }

  receipt = new receiptModel
  content;

  ngOnInit() {
    this.receipt.customer;
    this.receipt.title;
    this.printContent()

 
  }

  printContent(){
    let  trims = "Terima Kasih\n";
    let separator  = "--------------------------------\n";
    let title =  this.receipt.title + "\n\n"
    let tanggal = "Tanggal        : 03-12-2020\n";
    let noInvoice = "No Invoice   : IV20200001 \n";
    let customer = "Nama           : Ferdian Arief\n";
    let header = "    Item              Biaya\n";
    let item = "   #101          Rp. 9.000,-\n\n"
    let total = "     Total         Rp. 9.000,-\n\n\n";
    
   this.content = title + tanggal + noInvoice + customer + separator + header + separator + item + separator + total + trims;
  
  }
  
}
