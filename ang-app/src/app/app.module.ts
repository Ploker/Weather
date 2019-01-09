import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherService } from './service/weather.service';
import { CityService } from './service/city.service';
import { SearchComponent } from './search/search.component';
import { SecondDayComponent } from './second-day/second-day.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SecondDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule
  ],
  providers: [
    WeatherService,
    CityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
