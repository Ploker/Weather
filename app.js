const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { NominatimJS } = require('nominatim-js');
 
const api = require('./routes/api.route');
const apiKey = require('./config.json');

const port = 3000;
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use('/app', api);

app.get('/', (req, res) => {
    console.log('geted');
    res.status(200).json({status: 200, data: 'Hello World' , message: "Succesfully Recieved"});
    // res.send('Hello World');
})

// app.post('/appp/city', (req, res) => {
//     console.log('geted');
//     res.status(200).json({status: 200, data: 'Hello World' , message: "Succesfully Recieved"});
//     // res.send('Hello World');
// })

getCityByName = () => {

   

    // request.get('http://nominatim.openstreetmap.org/search?&format=jsonv2&city=Золочів&accept-language=uk',function(err,res){
    // if(err) console.log(err);    
    // console.log(res.body);
    
    // });
    
}

async function search(){
    let results = await NominatimJS.search({
      city: 'Львів',
      "accept-language": "uk"
    });
    results.forEach(e => {
        if(e.type == 'city' || e.type == 'town' || e.type == 'village'){
            let r = e.display_name.split(',');
            let obg = {
                city: r[0],
                region: r[r.length-2],
                country: r[r.length-1],
                lat: e.lat,
                lon: e.lon
            }
            
			console.log("​search -> obg", r.length);

			console.log("​search -> obg", obg);
            
        }
            


    })

   

    // console.log(results);
}

getWeatherByCity = (city) => {
    //https://nominatim.openstreetmap.org/search?&format=xml&city=Золочів
    
    
    request.get(`http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&units=metric&lang=ru&appid=${apiKey.appid}`,(err,res) =>{
        
         let f = JSON.parse(res.body)
        // console.log(f);
        let main = {
            // city: f.city.name,
            // country: f.city.country,
            data: []
        }
        let newMass = [];
        let lastDay = '';
        f.list.forEach((e,i) => {
            let tmp = e.dt_txt.split(' ');
           
            let daySort = [];
            let minTemp,
                maxTemp,
                tempFlag = true;

            if(lastDay < tmp[0] || lastDay == ''){
                
                if(lastDay == '')
                    lastDay = tmp[0];
        
                f.list.forEach(r => {
                
                    if(tmp[0] == r.dt_txt.split(' ')[0]){

                        if(tempFlag){
                            minTemp = r.main.temp_min;
                            maxTemp = r.main.temp_max;
                            lastDay = tmp[0];
                        }
                        else{
                            if(maxTemp < r.main.temp_max)
                                maxTemp = r.main.temp_max;
                            if(minTemp > r.main.temp_min)
                                minTemp = r.main.temp_min;
                        }

                        tempFlag = false;
                        let tmpDate = r.dt_txt.split(' ');

                        let obj = {
                            temp: r.main.temp,
                            humidity: r.main.humidity,
                            weatherName: r.weather[0].main,
                            weatherDescription: r.weather[0].description,
                            weatherIcon: r.weather[0].icon,
                            windSpeed: r.wind.speed,
                            windDeg: r.wind.deg,
                            date: tmpDate[0],
                            time: tmpDate[1].slice(0,5),
                        }
                        daySort.push(obj);
                        
                    }
                })

                newMass.push({
                    day: tmp[0],
                    data: daySort,
                    minTemp: minTemp,
                    maxTemp: maxTemp
    
                });

            }
            // console.log('min temp ' + e.main.temp);
            // console.log('влажность  ' + e.main.humidity);
            // console.log('погода ' + e.weather[0].main);
            // console.log('погода ' + e.weather[0].description);
            // console.log('Швидкість вітру ' + e.wind.speed);
            // console.log('Направленність вітру ' + e.wind.deg);
            // console.log('Дата ' + e.dt_txt);
            // console.log('погода ' + e.weather.description);
            // console.log('погода ' + e.weather.description);
         
        });
        main.data = newMass;
        // console.log(main);
        main.data.forEach(e => {
            console.log(e);
        })
       
        return res.body;
    });
}

app.listen(port,() => {
    console.log(`Node start listen ${port} port!`);
    // getWeatherByCity();
    // getCityByName();
    // search();
})
