import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { Weather } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'hmarka';
  iconSrc: any = '../public/img/cloud-outline-512.png';
  weather: Weather = new Weather();
  selectedDay: any; // Дописати
  city: string = ''; // Дописати 
  
  constructor(private service: WeatherService) {
    this.service.onClick.subscribe(w => {this.weather = w.data
		console.log("​AppComponent -> constructor -> this.weather", this.weather)
    
    });
   }

  ngOnInit(){}

  getWeatherByCity(lon, lat){
    console.log(this.service.weathers(lon,lat));
  }
}
