const request = require("request");
//********** weather check ****** */

const currentWeather = (lat,lon,callback)=>{
    const url ="http://api.weatherstack.com/current?access_key=e8c7ae7d29042e9c7afe4993fe6bdf93&query="+lat+","+lon;

    request({url,json:true},(error,{body})=>{
        if(error){            
            callback('Please check your network connection',undefined);
        }else if(body.error){
            callback(body.error.info,undefined)
        }else{
            const data1 = body;        
            callback(undefined,`${data1.current.weather_descriptions[0]}. It is currently ${data1.current.temperature} degrees out. It feels like ${data1.current.feelslike} degrees out`);
        }
    })
}
module.exports = currentWeather;