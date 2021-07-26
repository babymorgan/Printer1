export class PrintTemplate {
    ID: string;
    Code: string;
    Name: string;
    Field: string;
    Address: string;
    ContactInfo: string;
    Logo: string;
    FooterLeft: string;
    FooterRight: string;
    FooterNote: string;
    PrintMode: InvoicePrintMode;
    PrintLX300: boolean;
    DeliveryNote: string;
    AppendQR: boolean;
    ItemRenderMode: ItemRenderMode;
    CssClass: string;

    RemoveImage: boolean;
    DisplayName: string;
    DisplayNameCode: string;
    LogoBase64 : string;
}

export enum InvoicePrintMode { 
    A4 = 1, 
    RPR = 2 
}

export enum ItemRenderMode {
    SingleRow = 1,
    DoubleRow = 2
}