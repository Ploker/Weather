import { WeatherDay } from "./weather-day.model";

export class Weather {
    
    constructor(
        public city: string = '',
        public country: string = '',
        public data: WeatherDay[] = [new WeatherDay()]
    ){}
    
 }