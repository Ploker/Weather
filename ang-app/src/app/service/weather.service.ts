import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// import { APIKey } from './apiSettings.json';

@Injectable()
export class WeatherService{
    weathers: any;
    onClick: EventEmitter<number> = new EventEmitter();
    onSelect: EventEmitter<number> = new EventEmitter();

    constructor(private http: HttpClient){}

    public getWeather (lon: string, lat: string){
        this.getWeatherByLonLat(lon,lat).subscribe(res => {
            this.weathers = res;
            this.onClick.emit(this.weathers);
			console.log("​WeatherService -> publicgetWeather -> this.weathers", this.weathers)
            
            this.onSelect.emit(this.weathers.data.data[0]);
        });
    }

    public selectDay(id){
		// console.log("​WeatherService -> publicselectDay -> this.weathers", this.weathers.data.data.find(w => w.id == id));
        this.onSelect.emit(this.weathers.data.data.find(w => w.id == id));
    }

    private getWeatherByLonLat(lon, lat): Observable<any[]>{
        return this.http.post<any[]>(environment.apiUrl + '/app/weather',{lon: lon, lat: lat});
    }


    
    // public getWeather (city: string){
    //     this.getWeatherByCity(city).subscribe(res => {
    //         this.weathers = res;
    //         this.onClick.emit(this.weathers);
    //     });
    // }

    // getWeatherByCity(city: string): Observable<any[]>{
    //     return this.http.get<any[]>(environment.apiUrl + '/app/weather/' + city );
    //     // return this.http.get<any[]>(`http://api.openweathermap.org/data/2.5/find?q=${city},UA&type=like&units=metric&lang=ru&APPID=e4dfb69199adea28b89630f8735002d1`)
    // }

   

}