import { WeatherDayInfo } from "./weather-day-info.model";

 export class WeatherDay {
    constructor(
        public id: any = '',
        public day: string = '',
        public dateFormat: string = '',
        public minTemp: number = 0,
        public maxTemp: number = 0,
        public data: WeatherDayInfo[] = [new WeatherDayInfo()]
    ){}
}