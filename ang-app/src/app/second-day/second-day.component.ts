import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'app-second-day',
  templateUrl: './second-day.component.html',
  styleUrls: ['./second-day.component.scss']
})
export class SecondDayComponent implements OnInit {
  weather: Weather = new Weather();
  selectedDay: any;

  constructor(private serviceWeather: WeatherService) {
    this.serviceWeather.onClick.subscribe(w => this.weather = w.data);
      this.serviceWeather.onSelect.subscribe(s => {this.selectedDay = s; 
      console.log("​SecondDayComponent -> constructor -> s", s)
  });
  }

  ngOnInit() {}

  hidden(){
    if(this.selectedDay)
      return true;
    return false;
  }

  onSelectDay(id){
    this.serviceWeather.selectDay(id);
  }

  checkActive(id){
    if(this.selectedDay && this.selectedDay.id == id)
      return true;
    else
      return false;
  }

}
