const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setp handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setp static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weatherapp',
        name: 'Thomson'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Andrew Mead'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'hey',
        name: 'Invite',
        TextDescription: 'Webpage'
    })
})



// app.get('',(req,res)=>{
//     res.send('<h1>Salut les amis</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'And',
//         age: 25
//     },
//     {age: 20}])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h2>c mon site</h2>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "No address was provided"
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
    
            res.send({
                location,
                forecast: forecastData,
                address:req.query.address})

            
          })
    })
    // res.send({
    //     forecast: 50,
    //     location: "Philiadelphia",
    //     address: req.query.adress
    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error: 'Help article not found'
    })
})


//* = tt ce qui n'a pas ete precise avant
app.get('*',(rep,res)=>{
    res.render('error',{
        error: 'page not found'
    })
})



//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port 3000 ')
})