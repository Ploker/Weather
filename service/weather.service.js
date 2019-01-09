const request = require('request');
const apiKey = require('../config.json');

exports.getWeatherByCity = (city = 'kiev') =>{
    return new Promise(function(resolve, reject) {
        try {
            request.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},ua&units=metric&lang=ru&appid=${apiKey.appid}`,(err,res) =>{
                resolve(JSON.parse(res.body));
            });
        } catch (e) {
            reject(e);
        }
    });
}

exports.getWeatherFiveDayByCity = (city = 'Kiev') => {
    return new Promise(function(resolve, reject) {
        try {
            request.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},ua&units=metric&lang=ru&appid=${apiKey.appid}`,(err,res) =>{
                resolve(JSON.parse(res.body));
            });
        } catch (e) {
            reject(e);
        }
    });
}

exports.getWeatherSixteenDayByCity = (city = 'kiev') =>{
    return new Promise(function(resolve, reject) {
        try {
            request.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},ua&units=metric&lang=ru&appid=${apiKey.appid}`,(err,res) =>{
                resolve(JSON.parse(res.body));
            });
        } catch (e) {
            reject(e);
        }
    });
}


exports.getWeatherBylonlat = (lon,lat) =>{
    return new Promise(function(resolve, reject) {
        try {
            request.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${apiKey.appid}`,(err,res) =>{
                resolve(JSON.parse(res.body));
            });
        } catch (e) {
            reject(e);
        }
    });
}
