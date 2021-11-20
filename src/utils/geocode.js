const request = require('request')

const geocode = (address, callback) => {
    
    const option =  {
        url : 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFtZGV2ZGV2bWFyZSIsImEiOiJja3Z6NmV2Y3QxYjhsMnZwaG1odWljdzR3In0.FeFT0TYSDHll0RmLc2dBZA&limit=1',
        json: true
    }
    request(option, (error, { body }) => {
        if (error) {
            callback('Error while accessing the geocoding service', undefined)
        } else if (body.features && body.features.length === 0) {
            callback('Please provide valid address', undefined)
        } else {  
            callback(undefined, {
                lat : body.features[0].center[1],
                long:  body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode