const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('.\\utils\\gecode')
const forecast = require('.\\utils\\forecast')

const port = process.env.PORT || 3000
console.log(__dirname, __filename)
console.log(path.join(__dirname,'..','public'))

const app = express()

const publicDirectoryPath = path.join(__dirname,'..','public')
const viewPaths = path.join(__dirname,'../templates/views')
const partialsPaths = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPaths)
hbs.registerPartials(partialsPaths)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name:'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name:'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help Text',
        title: 'Help',
        name:'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'not address'})    
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return  res.send({
                    error:error})
        }
        forecast(latitude, longitude,(error, {summary}) => {
            if (error) {
                return  res.send({
                    error:error})
            }
            res.send({
                forecast:summary,
                location: location,
                address: req.query.address})
            console.log('Data', location, summary)
        })    
    })    
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'My help page not exists',
        name:'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My page not exists',
        name:'Andrew Mead'
    })
})

app.listen(port, () => {
    console.log('start' + port)
})