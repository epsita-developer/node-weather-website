var path = require('path');
var express = require('express');
var hbs = require('hbs');
var app = express();
const geoLocation = require('./utilities/geo-location');
const currentWeather =require('./utilities/forecast');
const port = process.env.PORT||3000;

//Define path for express config
const publicPathIndex = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

//set handlebar engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicPathIndex));

app.get('',(req,res)=>{
    res.render('index',{
        title:'This is My Web App!', 
        body: 'This is body content',
        name:'Epsita Biswas'
        }
        );
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'This is About!', 
        body: 'This is about content',
        name:'Epsita Biswas'
        });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'This is help',
        message: 'This is message for help page!',
        name:'Epsita Biswas'
    });
})

app.get('/weather',(req,res)=>{
    console.log(req.query);
    if(!req.query.address){
        return res.send({address:'Please provide address'})
    }

    geoLocation(req.query.address,(error,{location,latitude,longitude}={})=>{
        if(error){ return res.send({error})}        
            currentWeather(latitude,longitude,(error,response)=>{
                if(error){ return res.send({error});}
                
                    res.send({
                        forcast:response,
                        location,
                        address : req.query.address
                    });                
            })        
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404 Help',
        error_message : 'Help article not found',
        name : 'Epsita Biswas'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Page',
        error_message : 'Page not found',
        name : 'Epsita Biswas'
    })

})

app.listen(port,()=>{
    console.log('Port '+port+' Listining');
})