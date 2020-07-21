const request = require("request");

const geoLocation = (address,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiZXBzaXRhMTIzIiwiYSI6ImNrY295emloaTAxdWQycW95aWgyd2FjdWEifQ.bTjLQxeIzZAa3pk99V4NlQ&limit=1"

    request({url,json:true},(error,{body})=>{
        if(error){        
            callback('Please check your network connection!',undefined);
        }else if(body.message){        
            callback(body.message,undefined);
        }else if(body.features.length==0){        
            callback('Unable to find place',undefined);
        }else{
        const data = body.features[0];       
        const lat = data.center[1];
        const lon = data.center[0];
        const returnData = {'latitude':lat,'longitude':lon,'location': data.place_name}
        //callback(undefined,`Place : ${data.place_name} and Latitude : ${lat} and Longitude : ${lon}`);
        callback(undefined,returnData);     
        } 
    })
}


module.exports = geoLocation;