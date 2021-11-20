const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const option = {
        url : 'http://api.weatherstack.com/current?access_key=feab9956c832bc5ee1efa7d31f4648df&query='+ latitude +','+ longitude +'&units=m',
        json: true
    }
    request(option, (error, { body }) => {
        if (error) {
            callback('Error while accessing the weather service', undefined)
        } else if (body.error) {
            callback('Please provide valid address', undefined)
        } else {
            const weatherData = body.current
            callback(undefined, 'Temparature is '+ weatherData.temperature +'. Feels like '+ weatherData.feelslike)
        }
    })
}

module.exports = forecast