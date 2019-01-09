var CityService = require('../service/city.service');

_this = this

exports.getCityByName = async function(req, res, next){

    var city = req.body.city ? req.body.city : 'Kiev';
    
    try{
        var сities = await CityService.findCity(city);

        сities = generationDataСities(сities);
        return res.status(200).json({status: 200, data: сities, message: "Succesfully Recieved"});

    }catch(e){
        
        return res.status(400).json({status: 400, message: e.message});
    }
}

function generationDataСities(сities) {
    let arryCity = [];
    сities.forEach(e => {
        if(e.type == 'city' || e.type == 'town' || e.type == 'village'){
            let arryNameCity = e.display_name.split(',');
            let tmpObg = {
                city: arryNameCity[0],
                region: arryNameCity[arryNameCity.length-2],
                country: arryNameCity[arryNameCity.length-1],
                lat: e.lat,
                lon: e.lon
            }
            arryCity.push(tmpObg);
        }   
    })

    return arryCity;
}
