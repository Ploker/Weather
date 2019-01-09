const { NominatimJS } = require('nominatim-js');

exports.findCity = (city = 'kiev') => {
    return new Promise(async function(resolve, reject) {
        try {

            let results = await NominatimJS.search({
                city: city,
                "accept-language": "uk"
            });
            
            resolve(results);

        } catch (e) {
            reject(e);
        }
    });
}