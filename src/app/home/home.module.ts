import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { PrintBluetoothService } from '../service/printer.service';
import { HomePageRoutingModule } from './home-routing.module';
import { PrintContentService } from '../service/printcontent.service';
import { PrintLineService } from '../service/printline.service';
import { SumPipe } from '../pipe/filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  providers:[
    PrintBluetoothService,
    PrintContentService,
    PrintLineService,
    //PrintContentBody,
    DecimalPipe,
    DatePipe,
    SumPipe,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
