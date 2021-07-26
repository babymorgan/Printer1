export class Constants {
    static GuidEmpty: string = '00000000-0000-0000-0000-000000000000';
    static DecimalMinValue: any = '-7.922816251426434e+28';
    static MinDate: string = '0001-01-01T00:00:00';
    static MinTime: string = "00:00:00";
    static StringFormat(msg: string, ...args: string[]): string {
  
      for (var _i = 0; _i < args.length; _i++) {
        msg = msg.replace(`{${_i}}`, args[_i]);
      }
      return msg;
    }
  
    static IsNotEmpty(value: any): boolean {
      if (value != "" && value != Constants.GuidEmpty && value != undefined && value != null) {
        return true;
      }
      else {
        return false;
      }
  
    }
    static IsEmpty(value: any): boolean {
      if (value == '' || value == undefined || value == null || value == Constants.GuidEmpty) {
        return true;
      }
      else {
        return false;
      }
  
    }
    static FilterByID(array: any[], id: string): any {
      try {
  
        var list = array.filter(x => x.ID == id);
        if (list.length > 0) {
          return list[0];
        }
  
      } catch (ex) { }
      return '';
    }
    IsNotEmpty(value: any): boolean {
      return Constants.IsNotEmpty(value);
    }
    IsEmpty(value: any): boolean {
      return Constants.IsEmpty(value);
    }
    static DateOnly(date?: any): Date {
      if (date) {
        return new Date(new Date(date).toDateString());
      } else {
        return new Date(new Date().toDateString());
      }
  
    }
    constructor() {
  
    }
  }
  
  export class Formatter {
    static DecimalRound(input: number, place?: number, multiplesofFive?: number): number {
      place = place == undefined ? 2 : place;
      var multiplier = Math.pow(10, place);
      if (multiplesofFive) {
        //round down to multipler 5 
        input = input - (((input * multiplier) % 5) / multiplier);
      }
  
      return Math.round(input * multiplier) / multiplier;
    };
    static PadLeft(value: string, width: number, padChar?: string): string {
      var val = value;
      if (!padChar) { padChar = '0'; }
      while (val.length < width) {
        val = padChar + val;
      }
      return val;
    };
  }
  
  export class AlertMessage {
    static emptyNumber: string = 'Please fill invoice number';
    static failGetMenu: string = 'Fail to get pos menu';
    static failToGetRetur: string = 'Fail to get retur';
    static failGetLocalPosStorage: string = 'Fail to get setting and option from local storage, Please re-cache your data while online!';
    static failGetVariant: string = '"Error getting variant with {0} {1}" - {2}';
    static failGetLocalVariant: string = 'Fail to get variant from local storage, Please re-cache your data while online!';
    static emptyBarcodeFormat: string = 'No product with barcode \"{0}\"';
    static emptyCustomerFormat: string = 'No customer with code \"{0}\"';
    static failGetSalesOrder: string = 'Fail to get sales order';
    static failBin: string = 'Fail to bin transaction';
    static failGetCustomer: string = 'Fail to get customer\'s data';
    static failCreateCustomer: string = 'Fail to create customer';
    static noRoleContact: string = 'You have no right to create new customer';
    static submitLocally: string = 'Connection unavailable ~ offline! Order stored locally';
    static OfflineOrderNotSupport: string = 'Offline order is not Supported!';
    static failOrderConnectionTimeOut: string = 'Connection timeout! Please try uploading your order again!';
    static failDeletePark: string = 'Fail to delete park';
    static emptyAccessRegister: string = 'You do not have access to any Register';
    static failGenerateNewNumber: string = 'Fail to generate new number';
    static emptyPayment: string = 'There is no active payment method.';
    static failOpenRegister: string = 'Fail to open register';
    static failGetLocalOutletInfo: string = 'Fail to get outlet information from local storage, Please re-cache your data while online!';
    static failTrySubmit: string = '[Error submitting order] \n{0}';
    static failTryCreateCustomer: string = '"[Error creating customer] \n"{0}';
    static createCustomerOffline: string = 'Create customer is not supported when the connection offline';
    static emptyCustomer: string = 'Please select customer!';
    static emptySalesPerson: string = 'Please select sales person!';
    static emptySalesType: string = 'Please select sales type!';
    static failCreateNewVariant: string = 'Fail to create new variant';
    static requiredDefaultCategory: string = '[WARNING] - POS / Quick Create Product requires Default Category';
    static emptyVariant: string = 'Item is undefined, please re-type';
    static emptyPOItem: string = 'You must have at least one item';
    static emptyEntity: string = 'Please select entity before proceeding..';
    static failGetRetrieve: string = 'Fail to get retrieve';
    static failTryPark: string = '[Error submitting park] \n{0}';
    static failTryGetPark: string = '[Error during get park] \n{0}';
    static failTryGetOutStanding: string = '[Error during get outstanding] \n{0}';
    static failTryGetParkSelect: string = '[Error during get available park select] \n{0}';
    static failGetSerial: string = 'Fail to get variant serial';
    static successSendOrder: string = 'Orders synchronized to server. Upload Transaction Complete!';
    static successSyncProduct: string = 'Products synchronized to Local Storage';
    static failGetPark: string = 'Fail to get park';
    static failMergePark: string = 'Fail to merge park';
    static failGetOutStanding: string = 'Fail to get outstanding';
    static failGetParkSelect: string = 'Fail to get available park select';
    static confirmationDeleteOrder: string = 'Are you sure want to delete this order?';
    static confirmationCloseRegister: string = 'The Register is still occupied under \'{0}\'. Do you want to end his / her session?';
    static closeActiveRegister: string = 'You already have an active register with name \'{0}\'. Do you want to end your session?';
    static successSendEmail: string = 'Email is sent successfully to \'{0}\'';
    static wrongOfflineAction: string = 'This action is not supported when the connection offline';
    static emptyCustomerCredit: string = 'Credit Payment requires customer specified!';
    static debtLimit: string = 'Your debt is over limit!';
    static emptyCustomerDeposit: string = 'Deposit Payment requires customer specified!';
    static creditLock: string = 'You have no right to give credit!';
    static failToSyncProduct: string = 'Fail sync product to local storage!';
    static emptyDeliveryOutlet: string = 'There is no outlet in delivery module.';
    static wrongAuthorizationCode: string = 'Wrong Authorize Code!';
    static priceMinimumRestriction: string = 'You have no right to sell this item lower than {0}';
    static clearBrowsingData: string = 'A new version of our POS is available, please clear your browsing data to apply changes!';
    static offlineModeNotification: string = 'WARNING! Your point of sale configuration is set to LOCAL, orders are not synchronized automatically.';
    static failServerConnection: string = 'Something happen to the server, switch query to local mode to continue work!';
    static taxEmpty: string = 'Tax options is empty, go to setup and add tax!';
    static clearCommission: string = 'Are you sure to leave this page without saving?';
    static voidConfirm: string = "This will replace current order's item(s) with blank order.";
    static notSellAble: string = "This item is not for sell"
    static partialLoyaltyPointUnable: string = 'You only can fully pay with loyalty point, otherwise please remove the loyalty point and use other available payment options';
  
  }
  
  export class ServiceURL {
    static GetPOSStorage: string = "/API/POS/LoadPOS";
    static RemovePark: string = "/API/POS/VoidPark";
    static VoidPark: string = "/API/POS/VoidPark";
    static ReturInvoice: string = "/API/POS/ReturInvoice";
    static GetSalesOrderJSONByID: string = "/API/POS/GetSalesOrderJSONByID";
    static GetPOSDataByID: string = "/API/POS/GetPOSDataByID";
    static MergePark: string = "/API/POS/MergePark";
    static GetPark: string = "/API/POS/GetParkByEntityID";
    static GetOutStanding: string = "/API/POS/GetOutStandingByEntityID";
    static GetVacant: string = "/API/POS/GetParkInfoByEntityID";
    static RecordOpeningCash: string = "/API/POS/RecordOpeningCash";
    static OpenRegister: string = "/API/POS/OpenNGetOutletInfo";
    static BackdateNumber: string = "/API/POS/GenerateBackdateNumber";
    static GetVariantByID: string = "/API/Product/GetVariantByID";
    static GetVariantByCode: string = "/API/Product/GetVariantByCode";
    static GetVariantSerial: string = "/API/Product/GetVariantSerial";
    static CreateVariant: string = "/API/Product/CreateVariant";
    static SendInvoiceEmail: string = "/API/Transaction/SendEmail";
    static TransactionNumber: string = "/API/POS/GenerateNumber";
    static GetCustomerPrivilegeByID: string = "/API/Contact/GetPrivilegeByID";
    static GetCustomerByCode: string = "/API/Contact/GetByCode";
    static GetCustomerCode: string = "/API/Contact/GetCode";
    static GetCustomerEmailByID: string = "/API/Contact/GetEmailByID";
    static GetPriceBookByVariantID: string = "/API/Product/GetPriceBookByVariantID";
    static GetPackageID: string = "/API/POS/GetPackageID";
    static Authorize: string = "/API/AuthorizationKey/Authorize";
    static Invoice: string = "/API/Orders/InvoiceInfo";
    static OrdersLoader: string = "/API/OrdersLoader/CustomerInvoice";
    static Orders: string = "/API/Orders/CustomerInvoice";
    static PaymentReceivedLoader = "/API/PaymentLoader/DailyPaymentLoader";
    static PaymentReceived = "/API/Payment/DailyPaymentReceived";
    static CheckOutUrl = "/API/POS/SubmitOrder";
    static Scanner = "/API/AdjustmentLoader/StockTakeByCSV";
    static AdjustmentLoader = "/API/AdjustmentLoader/GetInventoryAdjustmentList";
    static Adjustment = "/API/Adjustment/GetInventoryAdjustmentList";
    static AdjustmentStorage = "/API/Adjustment/GetStorage";
    static GetNumberAdjustment = "/API/Adjustment/GenerateNumber";
    static GetAccountReceivableLoader = "/API/DebtLoader/AccountsReceiveableSummary";
    static GetAccountReceivableDetailLoader = "/API/DebtLoader/AccountsReceiveableDetails";
    static GetAccountReceivableSummary = "/API/Debt/AccountsReceiveableSummary";
    static getAccountreceivableDetail = "/API/Debt/AccountsReceiveableDetails";
    static ProductLibrarySuggestion: string = "/API/AC/GetVariantSuggestionByCodeNName";
    static VoidInvoiceLoader = "/API/OrdersLoader/VoidInvoiceLoader";
    static VoidInvoice = "/API/Orders/VoidInvoiceList";
    static WaitingPatientList = "/API/Treatment/WaitingPatientList";
    static CheckOutTreatmentByListID = "/API/Treatment/CheckOutByListID";
    static TreatmentRegisterLoader ="/API/TreatmentLoader/Registration";
    static TreatmentRegisterOutletInfo = "/API/Treatment/RegistrationGetOutletInfo";
    static TreatmentCustomerInfo =  "/API/Treatment/RegistrationGetCustomerInfo";
    static SubmitTreatementRegistration ="/API/Treatment/RegistrationSubmit";
    static SalesOrderMini = "/API/Print/SalesOrderMini";
    static ProductLoader = "/API/ProductLoader/ProductList";
    static ProductList = "/API/Product/GetProductList";
    static DeleteProductList = "/API/Product/DeleteProductList";
    static ProductForm = "/API/ProductLoader/ProductForm";
    static SubmitProduct = "/API/Product/SubmitProduct";
    static ProductInfo = "/API/ProductLoader/ProductInfoInitial";
    static CreateCategory = "/API/Product/CreateProductCategory"; 
    static VariantInfo = "/API/Product/GetVariantInfoModelById";
    static VariantFormData = "/API/Product/GetVariantFormInitialData";  
    static VariantForm = "/API/Product/GetVariantFormModelById";    
    static SubmitVariant = "/API/Product/SubmitVariant";    
    static GetSalesOrderPrint = "/API/POS/GetSalesOrderPrint";
    static Closure = "/API/POS/Closure";
    static ContactLoader = "/API/ContactLoader/CustomerList";
    static Contact = "/API/Contact/CustomerList";
    static ContactFormLoader = "/API/ContactLoader/ContactForm";
    static ContactForm = "/API/Contact/ContactForm";
  
    
    static DoctorFormLoad =  "/API/Treatment/DoctorFormLoad";
    static SubmitTreatment =  "/API/Treatment/SubmitTreatment";
    static TreatmentPackageLoader = "/API/TreatmentLoader/TreatmentPackageList";
    static TreatmentPackageList = "/API/Treatment/TreatmentPackageList";
    static TreatmentPackageHistoryInfo = "/API/TreatmentLoader/TreatmentPackageHistoryInfo";
    static GetRewardByPromotionID = "/API/POS/GetRewardByPromotionID";
  
    static InventoryDetailLoader = "/Api/InventoryLoader/InventoryReport";
    static InventoryDetail = "/Api/Inventory/InventoryReport";
  
  
    static ClosureHistoryList = "/API/Shift/ClosureHistoryList";
    static ShiftLoader = "/API/ShiftLoader/EndOFShift";
    static EndShiftDetail = "/API/Shift/EndOfShiftDetail";
    static PrintShift = "/API/Print/RegisterClosure";
    static TreatmentInvoice = "/API/Print/TreatmentInvoice";
    static TreatmentHistory = "/API/Treatment/TreatmentHistory";
  
  }
  
  export class RegisterUrl {
    static CheckDomainUrl: string = "http://www.dealpos-u7.com/Umbraco/API/Domain/IsDomainNameExist";
    static SubmitRegisterUrl: string = "http://www.dealpos-u7.com/Umbraco/API/Domain/RegisterTrial"
  }
  
  export enum ModalResponse { OnCancel = 0, OnOk = 1, Other = 2 }
  
  export enum InvoicePrintMode { A4 = 1, RPR = 2 }
  export enum ItemRenderMode {
    SingleRow = 1,
    DoubleRow = 2
  }
  export enum QuickKeyType {
    Direct = 0,
    Folder = 1
  }
  export enum TaxCalculationType {
    Add = 0,
    Include = 1
  }
  export enum TaxTypeEnum {
    Single = 1,
    Multiple = 2
  }
  export enum InventoryType {
  
    Any = 0,
    Standard = 1,
    NonInventory = 2,
    Composite = 3,
    Serialized = 4,
    Manufactured = 5,
    Complementary = 6,
    MultipleUOM = 7,
    PrepaidPoint = 8,
    TreatmentPackage = 10
  }
  export enum SubmissionType {
    Park = 1,
    Bill = 2,
    Payment = 3,
  }
  export enum InvoicedState {
    Pending = 1,
    Complete = 3
  }
  export enum PriceType {
    Default = 0,
    Edit = 1,
    Promotion = 2
  }
  
  
  export class Notes {
    name: string;
    success: boolean;
    note: any;
    time: string;
    data: any;
    template: any;
    config: any;
    Setting: any;
    PrintType: any
  }