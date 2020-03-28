const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6d3328c2a5353388c0f2f8299bc4b3aa/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=pl'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to service',undefined)            
        } else if(response.body.error) {
            callback('response error',undefined)            
        }    
        else {
            const summary = response.body.daily.data[0].summary
            const temperature = response.body.currently.temperature
            callback(undefined, {temperature: temperature, summary: summary})            
            }
    })
}
module.exports = forecast