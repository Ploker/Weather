import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { City } from '../models/city.model';


@Injectable()
export class CityService{
    сities: any;
    onClick:EventEmitter<number> = new EventEmitter();

    constructor(private http: HttpClient){}

    public getCity (city: string){
        this.getCityByName(city).subscribe(res => {
            this.сities = res;
            this.onClick.emit(this.сities);
        });
    }

    private getCityByName(city: string): Observable<any[]>{
        return this.http.post<any[]>(environment.apiUrl + '/app/city/',{city: city});
    }
}