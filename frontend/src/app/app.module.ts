import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { LineChartService } from '../line-chart/line-chart.service';
import { WebsocketService } from '../services/websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LineChartService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
