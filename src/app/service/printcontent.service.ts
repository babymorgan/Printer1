import { Injectable } from '@angular/core';
import { PrintType, PrinterSetting } from '../model/localDataModels'
import { DecimalPipe, DatePipe } from '@angular/common';
import { PrintLineService } from '../service/printline.service';
import { Constants } from '../model/constants';
import { SumReturnStringPipe, OrderByPipe, SumPipe } from '../pipe/filter'

let ctrl: any;

@Injectable({
  providedIn: 'root'
})

export class PrintContentService {
  Data: any;
  Template: any;
  Config: any;
  maxlength: number;
  PrinterSetting: PrinterSetting;
  limit: number = 12;
  isBluetooth: boolean;

  constructor(
    public decimalPipe: DecimalPipe,
    public sumdecimal: SumPipe,
    public datePipe: DatePipe,
    public printline: PrintLineService
  ) {
    ctrl = this;
  }



  Header(): string {
    this.printline.Init(this.maxlength);
    let header: string = "";
    header += this.printline.AppendCenter(this.Template.Name);

    if (ctrl.Template.Field) {
      header += this.LongString(ctrl.Template.Field.replace(/<br\s*[\/]?>/gi, "\n"));
    }

    if (ctrl.Template.Address) {
      header += this.LongString(ctrl.Template.Address.replace(/<br\s*[\/]?>/gi, "\n"));
    }

    return header;
  }

  LongString(text: string): string {
    let split: string[] = [];
    let output: string = "";
    split = text.split("\n");
    split.forEach(s => {
      if (Constants.IsNotEmpty(s))
        output += this.printline.AppendLongStringCenter(s);
    });

    return output;
  }

  ContacInfo(): string {
    let info: string = "";
    if (ctrl.Template.ContactInfo) {
      info += this.LongString(ctrl.Template.ContactInfo);
    }
    return info;
  }

  Contact(): string {
    let customer: string = "";
    if (ctrl.Data.Contact && ctrl.Config.PrintConfigInvoice.DocumentVisibility.CustomerVisible) {
      if (ctrl.Data.Contact.Name) {
        customer += this.printline.AppendCenter(ctrl.Data.Contact.Name);
      }
      if (ctrl.Data.Contact.MemberIdentification) {
        customer += this.printline.AppendCenter(ctrl.Data.Contact.MemberIdentification);
      }
      if (ctrl.Config && ctrl.Config.PrintConfigInvoice.DocumentVisibility.CustomerAddressVisible) {
        if (ctrl.Data.Contact.Address) {
          customer += this.LongString(ctrl.Data.Contact.Address.replace(/<br\s*[\/]?>/gi, "\n"));
        }
        if (ctrl.Data.Contact.Phone) {
          customer += this.printline.AppendCenter(ctrl.Data.Contact.Phone);
        }
        if (ctrl.Data.Contact.Mobile) {
          customer += this.printline.AppendCenter(ctrl.Data.Contact.Mobile);
        }


        if (Constants.IsNotEmpty(ctrl.Data.Contact.Email)) {
          customer += this.printline.AppendCenter(ctrl.Data.Contact.Email);
        }
      }
      customer += this.LineSeparator();
    }
    return customer;
  }

  Title() {
    let title = "";

    if (!this.isBluetooth) {
      if (ctrl.Data.Contact === null) {
        title += this.LineSeparator();
      }
      title += this.printline.AppendCenter(ctrl.Data.Title);
      if (ctrl.Config && ctrl.Config.PrintConfigInvoice.Footer.CreatorVisible) {
        title += this.printline.AppendLine(ctrl.Data.Date, ctrl.Data.Creator ? ctrl.Data.Creator : ctrl.Data.PrintPerson);
      }
      title += this.LineSeparator();
    } else {
      title += this.printline.AppendCenter(ctrl.Data.Title) + "\n";
      if (ctrl.Config && ctrl.Config.PrintConfigInvoice.DocumentVisibility.InvoiceCreatedTimeVisible) {
        title += ctrl.Data.Date + "\n";
      }

      title += this.LineSeparator();
    }
    return title;
  }

  TitlePark() {
    this.printline.Init(this.maxlength);
    let title = "";
    title += this.printline.AppendCenter(this.PrinterSetting.Name);
    title += this.printline.AppendCenter("#" + ctrl.Data.Title);
    title += this.LineSeparator();

    return title;
  }

  ExtraNotePark() {
    let title = "";
    title += this.printline.AppendCenter(ctrl.Data.ExtraNote) + "\n";
    return title;
  }

  DatePark() {
    let title = "";
    title += this.printline.AppendLine(ctrl.Data.Date, ctrl.Data.Creator);
    title += this.LineSeparator();
    return title;
  }

  LineSeparator(): string {
    return this.printline.Separator();
  }

  Item(withPrice: boolean): string {
    let itemsText: string = "";
    let quantityTotal: number | string = 0;
    if (ctrl.Data.Items) {
      ctrl.Data.Items.forEach((item: any) => {
        quantityTotal += item.Quantity;

        let discount: string = item.Discount ? " - " + item.Discount + "%" : "";
        discount += item.DiscountAmount ? " - " + item.DiscountAmount : "";
        let price: string = (item.Quantity > 0) ? " X " + item.UnitPrice : "";

        let uom = "";

        if (ctrl.Config) uom = ctrl.Config.PrintConfigInvoice.ItemsTable.UOMVisible ? item.Variant.UOMName : "";
        let qty: string = "";
        if (uom == null || uom == "") {
          qty = item.Quantity + " " + price;
        }
        else {
          qty = item.Quantity + " " + uom + price;
        }



        let total: string = "0";
        if (item.Total != undefined) {
          total = this.decimalPipe.transform(item.Total).toString();
        }
        let iName: string = item.Variant ? item.Variant.Name : item.Name;
        let name: string = iName + (discount ? discount : "");
        if (withPrice) {
          if (item.Quantity == 1) itemsText += this.printline.AppendLine(name, total);
          else {
            itemsText += this.printline.AppendLeft(iName) + "\n";


            itemsText += this.printline.AppendLine(qty + discount, total);
          }
        }
        else {
          itemsText += this.printline.AppendLine(iName, this.decimalPipe.transform(item.Quantity).toString() + uom);
        }
        itemsText += this.ItemNote(item.Note);
      });
      itemsText += this.LineSeparator();
      itemsText += this.printline.AppendTextRightLine("Qty", this.decimalPipe.transform(quantityTotal), ":");
    }
    return itemsText;
  }

  
  ItemforPark(withPrice: boolean): string {
    let itemsText: string = "";
    let quantityTotal: number | string = 0;
    if (ctrl.Data.Items) {
      ctrl.Data.Items.forEach((item: any) => {
        quantityTotal += item.Quantity;

        let discount: string = item.Discount ? " - " + item.Discount + "%" : "";
        let price: string = (item.Quantity > 0) ? " X " + item.UnitPrice : "";
        let qty: string = item.Quantity + price;
        let total: string = "0";
        if (item.Total != undefined) {
          total = this.decimalPipe.transform(item.Total).toString();
        }
        let iName: string = item.Variant ? item.Variant.Name : item.Name;
        let name: string = iName + (discount ? discount : "");
        if (withPrice) {
          if (item.Quantity == 1) itemsText += this.printline.AppendLine(name, total);
          else {
            itemsText += this.printline.AppendLeft(iName) + "\n";
            itemsText += this.printline.AppendLine(qty + discount, total);
          }
        }
        else {
          itemsText += this.decimalPipe.transform(item.Quantity).toString() + " X " + iName;
          itemsText += "\n";
        }
        itemsText += this.ItemNote(item.Note);
      });
      itemsText += this.LineSeparator();
    }
    return itemsText;
  }

  ItemNote(note: string): string {

    let itemNote: string = "";
    if (note) {
      itemNote += "Note : \n";
      let temp: string[] = this.extractTextFromHtmlTag(note);
      if (Constants.IsNotEmpty(temp)) {
        temp.forEach(text => {
          let textline: string[] = text.split("\n");
          textline.forEach(line => {
            if (Constants.IsNotEmpty(line)) {
              itemNote += line + "\n";
            }
          });
        });
      }
      else {
        itemNote += note + "\n";
      }

    }
    return itemNote;
  }

  Summary(): string {
    let summaryText: string = "";
    if (ctrl.Data.AmountSummary) {
      ctrl.Data.AmountSummary.forEach((item: any) => {
        if (item.Amount) {
          //summaryText += item.Label + ": " + item.CurrencySymbol + " " + this.decimalPipe.transform(item.Amount) + "\n";
          let total: string = this.decimalPipe.transform(item.Amount);
          summaryText += this.printline.AppendTextRightLine(item.Label.replace("Discount", "Disc."), total, ":", item.CurrencySymbol);
        }
      });
    }
    return summaryText;
  }

  PaymentMethod(): string {
    let extraText: string = "";
    if (ctrl.Data.Payments && ctrl.Config) {
      extraText += this.printline.PrintRight("Payment");
      let paymentText: string = "";

      if (ctrl.Data.Payments.length > 1) {
        ctrl.Data.Payments.forEach((item: any) => {
          if (item.Amount != 0) {
            let paymentNote: string = "";
            if (item.Note) {
              paymentNote += item.Note + "-";
            }
            paymentText = item.MethodName + "-" + paymentNote + this.decimalPipe.transform(item.Amount);
            extraText += this.printline.PrintRight(paymentText)
          }
        });
      } else {
        ctrl.Data.Payments.forEach((item: any) => {
          if (item.Amount != 0) {
            let paymentNote: string = "";
            if (item.Note) {
              paymentNote += item.Note + "-";
            }
            paymentText = item.MethodName + " " + paymentNote;
            extraText += this.printline.PrintRight(paymentText)
          }
        });
      }
    }

    let sum: number = ctrl.Data.Payments ? this.sumdecimal.transform(ctrl.Data.Payments, "Amount") : 0;

    let multiplier: number = Math.pow(10, 4);
    let diff: number = Math.round((ctrl.Data.FinalAmount - sum) * multiplier) / multiplier;
    let remain: number = 0;

    if (ctrl.Config) {
      if (diff != 0 && Math.abs(diff) > ctrl.Config.ModuleSell.ToleranceAmount) {
        remain = diff
      }
    }

    if (remain > 0) {
      if (ctrl.Data.Payments.length == 1 && ctrl.Data.Payments[0].Amount != 0) {
        extraText += this.printline.PrintRight(this.decimalPipe.transform(ctrl.Data.Payments[0].Amount))
      }
      extraText += this.printline.PrintRight("Remaining");
      extraText += this.printline.PrintRight(this.decimalPipe.transform(diff));
    }
    return extraText;
  }

  LoyaltyPoint(): string {
    let loyalty: string = "";
    if (ctrl.Data.LoyaltyPoint) {
      loyalty += "Point \n";
      //$(data.LoyaltyPoint).text().replace(/<br\s*[\/]?>/gi, "\n");
      let temp: string[] = this.extractTextFromHtmlTag(ctrl.Data.LoyaltyPoint);
      temp.forEach(text => loyalty += text + '\n');
    }
    return loyalty;
  }

  coupon(): string {
    let coupon: string = "";
    if (ctrl.Data.Coupon) {
      coupon += this.printline.AppendLine("coupon", ctrl.Data.Coupon.toString());
    }
    return coupon;
  }

  ExtraNote(): string {
    let extra: string = "";
    if (ctrl.Data.ExtraNote) {
      let extraNote: string = ctrl.Data.ExtraNote.replace(/<br\s*[\/]?>/gi, "\n") + "\n";
      extra += this.LongString(extraNote);
    }
    return extra;
  }


  Note(type: PrintType): string {
    let extra: string = "";
    if (ctrl.Config) {
      extra += type == PrintType.Park ? this.ExtraNote() : this.SalesName();
      extra += type == PrintType.Park ? this.SalesName() : this.ExtraNote();
      if (type == PrintType.Park) extra += this.NumberOfPerson();
      extra += this.InvoiceNote();
    }
    return extra;
  }

  InvoiceNote(): string {
    let invoiceNote: string = "";
    if (ctrl.Data.InvoiceNote && ctrl.Config.PrintConfigInvoice.Footer.NoteVisible) {
      let note: string = ctrl.Data.InvoiceNote.replace(/<br\s*[\/]?>/gi, "\n") + "\n";
      invoiceNote += this.LongString(note)
    }
    return invoiceNote;
  }

  SalesName(): string {
    let sales: string = "";
    if (ctrl.Data.SalesName) {
      let label: string = ctrl.Config.PrintConfigInvoice.DocumentLabel.SalesPerson + " : " + ctrl.Data.SalesName;
      sales += this.printline.AppendLongStringCenter(label);
    }
    return sales;
  }

  NumberOfPerson(): string {
    let person: string = "";
    if (ctrl.Data.NumberOfPerson) person += this.printline.AppendCenter("Number Of Person : " + ctrl.Data.NumberOfPerson)
    return person;
  }

  
  FooterLeft(): string {
    let footerleft: string = "";
    if (this.Template.FooterLeft) {
      let temp: string[] = this.extractTextFromHtmlTag(this.Template.FooterLeft);
      temp.forEach((text) => {
        footerleft += this.printline.leftnotecut(text);
      });
    }
    return footerleft;
  }

  
  PrintTime(): string {
    let printime: string = "";
    if (ctrl.Data.PrintTime) {
      let createdDate: string = this.datePipe.transform(ctrl.Data.PrintTime, "dd MMM yyyy HH:mm");
      printime += this.printline.AppendCenter(createdDate);
    }
    return printime;

  }

  PrintPerson(): string {
    let printPerson: string = "";
    if (ctrl.Config && ctrl.Config.PrintConfigInvoice.Footer.CreatorVisible) {
      printPerson += this.printline.AppendCenter(ctrl.Data.Creator ? ctrl.Data.Creator : ctrl.Data.PrintPerson);
    }
    return printPerson;
  }

  Feed(count: number): string {
    let feed: string = "";
    for (let i: number = 0; i < count; i++) {
      feed += '\n'
    }
    return feed;
  }

  parkNote(): string {
    let extra: string = "";
    extra += this.NumberOfPerson() + this.InvoiceNote();
    return extra;
  }

  private extractTextFromHtmlTag(text: string): string[] {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = text;

    let result: string[] = [];
    let children = span.children;
    for (let i: number = 0; i < children.length; i++) {
      let temp: string = children[i].textContent;
      if (temp && temp.trim() != "") {
        result.push(children[i].textContent);
      }
    }

    return result;
  }



}

@Injectable({
  providedIn: 'root'
})
export class PrintContentBody extends PrintContentService {
  GenerateContent(type: PrintType): string {
    let content: string = "";

    content += this.Header(); // Generate  Template Name & Address
    content += this.ContacInfo(); //Generate  Contact Info
    content += this.Contact(); // Generate  Contact
    content += this.Title();

    let printPrice: boolean = false;
    printPrice = true;
    content += this.Item(printPrice); // Generate  Item
    content += this.Summary(); // Generate  For Summary Footer
    content += this.PaymentMethod(); // Generate Print For Payment Method

    if (ctrl.Data.LoyaltyPoint) {
      content += this.LoyaltyPoint();
    }

    if (ctrl.Data.Coupon) {
      content += this.coupon();
    }

    content += this.Note(PrintType.Receipt);
    content += this.FooterLeft();

    content += this.PrintTime();
    if (this.isBluetooth && ctrl.Config) {
      if (ctrl.Config.PrintConfigInvoice.Footer.CreatorVisible) {
        content += this.PrintPerson();
      }
    }
    content += this.Feed(1);

    return content;
  }


  GenerateContentPark(type: PrintType): string {
    let content: string = "";
    content += this.TitlePark();
    content += this.ExtraNotePark();
    content += this.DatePark();

    let printPrice: boolean = false;
    content += this.ItemforPark(printPrice); // Generate  Item
    content += this.parkNote();
    content += this.Feed(5);
    return content;
  }
}
