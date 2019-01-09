export class WeatherDayInfo {
    constructor(
        public city: string = '', 
        public country: string = '',
        public temp: number = 0,
        public humidity: number = 0,
        public weatherName: string = '',
        public weatherDescription: string = '',
        public weatherIcon: string = '',
        public windSpeed: number = 0,
        public windDeg: number = 0,
        public date: string = '',
        public dateFormat: string = '',
        public time: string = '',
    ){}
    
 }