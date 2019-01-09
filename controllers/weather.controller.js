var moment = require('moment');
var WeatherService = require('../service/weather.service.js');

moment.locale('uk');
_this = this

exports.getWeatherByCity = async function(req, res, next){

    var city = req.body.city ? req.body.city : 'Kiev';

    try{
        
        var weather = await WeatherService.getWeatherByCity(city);
        weather = generationDataWeather(weather);
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        return res.status(200).json({status: 200, data: weather, message: "Succesfully Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getWeatherFiveDayByCity =  async function(req, res, next){

    var city = req.params.city ? req.params.city : 'kiev';

    try{
        var weather = await WeatherService.getWeatherFiveDayByCity(city);
        weather = generationDataWeather(weather);
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        return res.status(200).json({status: 200, data: weather, message: "Succesfully Recieved"});
    }catch(e){
        console.log(e);
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getWeatherBylonlat = async function(req, res, next){
    
    let lon = req.body.lon ? req.body.lon : 0;
    let lat = req.body.lat ? req.body.lat : 0;

    try{
        var weather = await WeatherService.getWeatherBylonlat(lon,lat);
        weather = generationDataWeather(weather);
        
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        return res.status(200).json({status: 200, data: weather, message: "Succesfully Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}


////Functions 

function generationDataWeather(mass) {
            let main = {
                // city: mass.city.name,
                // country: mass.city.country,
                data: []
            },
                newMass = [],
                lastDay = '';

            mass.list.forEach((e,i) => {
                let tmp = e.dt_txt.split(' '),
                    daySort = [],
                    minTemp,
                    maxTemp,
                    tempFlag = true;
    
                if(lastDay < tmp[0] || lastDay == ''){
                    
                    if(lastDay == '')
                        lastDay = tmp[0];
            
                    mass.list.forEach(r => {
                    
                        if(tmp[0] == r.dt_txt.split(' ')[0]){
    
                            if(tempFlag){
                                minTemp = parseInt(r.main.temp);
                                maxTemp = parseInt(r.main.temp);
                                lastDay = tmp[0];
                            }
                            else{
                                if(maxTemp < r.main.temp)
                                    maxTemp = parseInt(r.main.temp);
                                if(minTemp > r.main.temp)
                                    minTemp = parseInt(r.main.temp);
                            }
    
                            tempFlag = false;
                            let tmpDate = r.dt_txt.split(' ');
    
                            let obj = {
                                temp: parseInt(r.main.temp),
                                humidity: r.main.humidity,
                                weatherName: r.weather[0].main,
                                weatherDescription: r.weather[0].description,
                                weatherIcon: r.weather[0].icon,
                                windSpeed: r.wind.speed,
                                windDeg: r.wind.deg,
                                date: tmpDate[0],
                                dateFormat: moment(tmpDate[0]).format('dddd, DD MMMM'),
                                time: tmpDate[1].slice(0,5),
                            }
                            daySort.push(obj);
                            
                        }
                    })
    
                    newMass.push({
                        id: e.dt,
                        day: tmp[0],
                        dateFormat: moment(tmp[0]).format('dddd, DD MMMM'),
                        data: daySort,
                        minTemp: minTemp,
                        maxTemp: maxTemp
        
                    });
    
                }
            });
            main.data = newMass;
            return main;
}

// function capitalize(s){
//     return s && s[0].toUpperCase() + s.slice(1);
// }