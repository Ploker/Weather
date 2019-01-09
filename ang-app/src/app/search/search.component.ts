import { Component, OnInit } from '@angular/core';

import { CityService } from '../service/city.service';
import { WeatherService } from '../service/weather.service';
import { City } from '../models/city.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  weather: any;
  selectedDay: any;
  cities: any[] = [];
  city: City = new City();

  constructor(private weatherService: WeatherService,private cityService: CityService) {
    this.weatherService.onClick.subscribe(w => this.weather = w);
    this.weatherService.onSelect.subscribe(s => this.selectedDay = s);

    this.cityService.onClick.subscribe(c => {
      this.cities = [];
      c.data.forEach(e => {
        this.cities.push(new City(e.city,e.region,e.country,e.lat,e.lon,e.city + ", " + e.region + ' ' + e.country));
      });
    });

   }

  ngOnInit() {}

  getCityByName(){
    console.log(this.city);
    this.cityService.getCity(this.city.city);
  }
   
  onS(event){
    this.weatherService.getWeather(event.lon, event.lat)
    this.city = new City();
  }

}
