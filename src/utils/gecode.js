const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoienNvcm9rb3dza2kiLCJhIjoiY2s3cXNmc3JwMDZjYTNmb3VoNGVndzR4diJ9.hEcEYlgmAMPsn_cFoEjB-w&limit=1'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to service',undefined)            
        } else if (response.body.features.length === 0) {
            console.log('Try another search',undefined) 
            } else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined, {latitude: latitude, longitude: longitude, location: location})            
            }
    })
}
module.exports = geocode