export class PrinterSetting
{
    MaxLength : number;
    NumberOfCopiesReceipt  : number;
    NumberOfCopiesOrder  : number;
    Cut:boolean;
    Eject:boolean;
    Code_Cutter : string;
    Code_Eject : string;
    paperwidth : number;
    constructor()
    {
     
        this.MaxLength = 32;
        this.NumberOfCopiesReceipt  = 1;
        this.NumberOfCopiesOrder = 1;
        this.Cut = false;
        this.Code_Cutter = "1D564200";
        this.Code_Eject = "1B700019FA";
        this.paperwidth = 58;
        
    }
}

